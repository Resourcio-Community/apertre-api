"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bullmq_1 = require("bullmq");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prismaClient = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    },
    log: ['info']
});
const queue = new bullmq_1.Queue('apertre', {
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        username: 'default',
        password: process.env.REDIS_PASSWORD
    }
});
const eventLabel = "apertre";
const levelsData = {
    easy: "Easy", // 5
    medium: "Medium", // 10
    hard: "Hard" // 15
};
let counter, finalData;
function createLeaderboard() {
    return __awaiter(this, void 0, void 0, function* () {
        const repos = [];
        counter = 0, finalData = [];
        console.time('Time elapsed');
        try {
            const response = yield fetch(`${process.env.SERVER_URL}/api/v1/repo/getrepos`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const allRepos = yield response.json();
            allRepos.data.map((repo) => {
                repos.push(repo.projectLink.substring(19));
            });
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
        for (let i = 0; i < repos.length; i++) {
            const repoName = repos[i];
            const data = yield fetchRepoData(repoName);
            console.log(`[[Fetching Completed -> ${repoName}]]\n\n`);
            finalData = [...finalData, ...data];
        }
        let leaderboardData = generateRank(finalData).sort((a, b) => a.total_points < b.total_points ? 1 : -1);
        let rank = 1, finalLeaderboard = [];
        for (let pos = 0; pos < leaderboardData.length; pos++) {
            const currentData = leaderboardData[pos];
            const { full_name, linkedIn } = yield getDatafromDB(currentData.user_name);
            if (full_name !== '') {
                currentData.full_name = full_name;
                currentData.linkedIn = linkedIn;
                if (pos === 0) {
                    currentData.rank = rank;
                }
                else {
                    const prevData = leaderboardData[pos - 1];
                    if (prevData.total_points > currentData.total_points) {
                        rank++;
                        currentData.rank = rank;
                    }
                    else {
                        currentData.rank = rank;
                    }
                }
                finalLeaderboard.push(currentData);
            }
        }
        console.timeEnd('Time elapsed');
        // Send finalLeadeboard to redis queue
        try {
            const job = yield queue.getJob('leaderboard');
            if (!job) {
                yield queue.add('leaderboard', {
                    lastUpdated: new Date(),
                    leaderboardData: finalLeaderboard
                }, { jobId: 'leaderboard' });
            }
            else {
                yield job.updateData({
                    lastUpdated: new Date(),
                    leaderboardData: finalLeaderboard
                });
            }
            console.log(`Leaderboard updated to Redis at ${new Date()}`);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield queue.close();
        }
    });
}
function getDatafromDB(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        let finalData = { full_name: '', linkedIn: '' };
        try {
            const data = yield prismaClient.mentees.findFirst({
                where: {
                    github: `https://github.com/${userName}`
                }
            });
            if (data) {
                finalData.full_name = data.name;
                finalData.linkedIn = data.linkedIn;
            }
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
        return finalData;
    });
}
function fetchRepoData(repoName) {
    return __awaiter(this, void 0, void 0, function* () {
        let pageCount = 1;
        let pageAvailabe = true;
        let allData = [];
        while (pageAvailabe) {
            const reqUrl = `https://api.github.com/repos/${repoName}/pulls?state=closed&per_page=100&page=${pageCount}`;
            try {
                counter++;
                console.log(`${counter}. Fetching data for: ${repoName} and pageCount: ${pageCount}`);
                const response = yield fetch(reqUrl, {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`,
                        'X-GitHub-Api-Version': '2022-11-28',
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                console.log(`Data has been fetched for: ${repoName} and pageCount: ${pageCount}`);
                console.log('------------------------------------------------------------------');
                const data = yield response.json();
                if (data.length !== 0) {
                    const apertreData = filterApertre(data);
                    allData = [...allData, ...apertreData];
                    pageCount++;
                }
                else {
                    pageAvailabe = false;
                }
            }
            catch (err) {
                console.error(err);
                pageAvailabe = false;
                process.exit(1);
            }
        }
        return allData;
    });
}
function filterApertre(allData) {
    let finalData = [];
    const year = '2024'; /* change it to 2024 later */
    const apertreData = allData.filter((prData) => {
        let isApertre = false;
        if (prData.merged_at) {
            prData.labels.map((eachLabel) => {
                if (eachLabel.name.toLowerCase().includes(eventLabel.toLowerCase())) {
                    isApertre = true;
                }
            });
            if (!prData.created_at.includes(year))
                isApertre = false;
        }
        return isApertre;
    });
    if (apertreData.length !== 0) {
        apertreData.map((prData) => {
            const data = {
                user_name: prData.user.login,
                avatar_url: prData.user.avatar_url,
                user_url: prData.user.html_url,
                pr_url: prData.html_url,
                labels: prData.labels.map((labelData) => labelData.name)
            };
            finalData = [...finalData, data];
        });
    }
    return finalData;
}
function generateRank(fullData) {
    let finalData = [];
    fullData.map((eachPrData) => {
        const index = finalData.findIndex((data) => data.user_name === eachPrData.user_name);
        const { point, difficulty } = getPoints(eachPrData.labels);
        if (index === -1) {
            const userData = {
                user_name: eachPrData.user_name,
                avatar_url: eachPrData.avatar_url,
                user_url: eachPrData.user_url,
                total_points: point,
                pr_urls: [
                    {
                        url: eachPrData.pr_url,
                        difficulty
                    }
                ]
            };
            finalData = [...finalData, userData];
        }
        else {
            finalData[index].total_points += point;
            finalData[index].pr_urls.push({
                url: eachPrData.pr_url,
                difficulty
            });
        }
    });
    return finalData;
}
function getPoints(labelsArray) {
    let point = 0, difficulty = '';
    labelsArray.map((label) => {
        if (label.toLowerCase().includes(levelsData.easy.toLowerCase())) {
            difficulty = levelsData.easy;
            point = 5;
        }
        if (label.toLowerCase().includes(levelsData.medium.toLowerCase())) {
            difficulty = levelsData.medium;
            point = 10;
        }
        if (label.toLowerCase().includes(levelsData.hard.toLowerCase())) {
            difficulty = levelsData.hard;
            point = 15;
        }
    });
    return { point, difficulty };
}
prismaClient.$connect()
    .then(() => createLeaderboard().then(() => prismaClient.$disconnect()))
    .catch((err) => console.error(err.message));
