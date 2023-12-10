import axios from 'axios'
import dotenv from 'dotenv'
const repos = require('../data/allRepos.json')

dotenv.config()

const ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN

const eventLabel = "apertre"
const levelsData = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard"
}
let finalData = []

const fetchAllData = async () => {
    for (let i = 0; i < repos.length; i++) {
        const repoName = repos[i]
        const data = await fetchRepoData(repoName)
        console.log(`Completed for: ${repos[i]}`)
        finalData = [...finalData, ...data]
    }

    let leaderboardData = generateRank(finalData).sort((a, b) =>
        a.total_points < b.total_points ? 1 : -1
    )

    let rank = 1

    for (let pos = 0; pos < leaderboardData.length; pos++) {
        const currentData = leaderboardData[pos]

        const { full_name, college } = await getDatafromDB(currentData.user_name);

        currentData.full_name = full_name
        currentData.college = college

        if (pos === 0) {
            currentData.rank = rank
        } else {
            const prevData = leaderboardData[pos - 1]
            if (prevData.total_points > currentData.total_points) {
                rank++
                currentData.rank = rank
            } else {
                currentData.rank = rank
            }
        }
    }

    // writeJson({
    //     lastUpdated: new Date(),
    //     data: leaderboardData
    // })
}

const getDatafromDB = async (userName) => {
    let finalData = { full_name: '', college: '' }
    try {
        const db = client.db("apertreDB")
        const collection = db.collection("mentees")
        const data = await collection.findOne({ $text: { $search: userName } })
        if (data) {
            finalData.full_name = data.name
            finalData.college = data.college
        }
    } catch (error) {
        console.log(error)
    }

    return finalData
}

let counter = 0

const fetchRepoData = async (repoName) => {
    let pageCount = 1
    let pageAvailabe = true
    let allData = []

    while (pageAvailabe) {
        const reqUrl = `https://api.github.com/repos/${repoName}/pulls?state=closed&per_page=100&page=${pageCount}`
        try {
            counter++
            console.log(`${counter}. Fetching data for: ${repoName} and pageCount: ${pageCount}`)
            const { data } = await axios.get(reqUrl, {
                headers: {
                    authorization: `token ${ACCESS_TOKEN}`,
                    "User-Agent": "request",
                    Accept: "application/vnd.github.v3+json"
                }
            })

            console.log(`Data has been fetched for: ${repoName} and pageCount: ${pageCount}`)
            console.log("_____________")

            if (data.length !== 0) {
                const apertreData = filterApertre(data)
                allData = [...allData, ...apertreData]
                pageCount++
            } else {
                pageAvailabe = false
            }
        } catch (error) {
            console.log(error.message)
            pageAvailabe = false
            process.exit(1)
        }
    }

    return allData
}

const filterApertre = (allData) => {
    let finalData = []
    const year = '2024'
    const apertreData = allData.filter((prData) => {
        let isApertre = false
        if (prData.merged_at) {
            prData.labels.map((eachLabel) => {
                if (eachLabel.name.toLowerCase().includes(eventLabel.toLowerCase())) {
                    isApertre = true
                }
            })
            if (!prData.created_at.includes(year)) isApertre = false;
        }

        return isApertre
    })

    if (apertreData.length !== 0) {
        apertreData.map((prData) => {
            const data = {
                user_name: prData.user.login,
                avatar_url: prData.user.avatar_url,
                user_url: prData.user.html_url,
                pr_url: prData.html_url,
                labels: prData.labels.map((labelData) => labelData.name),
                phase: getPhase(prData.created_at)
            }
            finalData = [...finalData, data]
        })
    }

    return finalData
}

// Check deadline later
const getPhase = (created_at) => {
    const phasedeadlineISO = '' // To be set later in ISO format
    const deadline = new Date(phasedeadlineISO)
    const createdAtDate = new Date(created_at)

    if (createdAtDate > deadline) return 2
    return 1
}

const generateRank = (fullData) => {
    let finalData = []

    fullData.map((eachPrData) => {
        const index = finalData.findIndex(
            (data) => data.user_name === eachPrData.user_name
        )

        const { point, difficulty } = getPoints(
            eachPrData.labels,
            eachPrData.phase
        );

        if (index === -1) {
            const userData = {
                user_name: eachPrData.user_name,
                avatar_url: eachPrData.avatar_url,
                user_url: eachPrData.user_url,
                total_points: point,
                pr_urls: [
                    {
                        url: eachPrData.pr_url,
                        difficulty: difficulty,
                        phase: eachPrData.phase,
                    }
                ]
            }

            finalData = [...finalData, userData]
        } else {
            finalData[index].total_points += point
            finalData[index].pr_urls.push({
                url: eachPrData.pr_url,
                difficulty: difficulty,
                phase: eachPrData.phase
            })
        }
    })

    return finalData
}

const getPoints = (labelsArray, phase) => {
    let point = 0, difficulty = ''

    labelsArray.map((label) => {
        if (label.toLowerCase().includes(levelsData.easy.toLowerCase())) {
            difficulty = levelsData.easy
            if (phase === 1) {
                point = 1
            } else {
                point = 2
            }
        }
        if (label.toLowerCase().includes(levelsData.medium.toLowerCase())) {
            difficulty = levelsData.medium
            if (phase === 1) {
                point = 3
            } else {
                point = 4
            }
        }
        if (label.toLowerCase().includes(levelsData.hard.toLowerCase())) {
            difficulty = levelsData.hard
            if (phase === 1) {
                point = 5
            } else {
                point = 8
            }
        }
    })

    return { point, difficulty }
}