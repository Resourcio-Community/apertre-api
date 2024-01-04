import axios from 'axios'
import dotenv from 'dotenv'
import { Response } from '../utils/Response.js'
import { repos } from '../data/allRepos.js'
import Mentee from '../db/models/Mentee.js'

dotenv.config()

const eventLabel = "apertre"
const levelsData = {
    easy: "Easy", // 5
    medium: "Medium", // 10
    hard: "Hard" // 15
}

let counter, finalData

export const fetchAllData = async (req, res) => {
    counter = 0, finalData = []
    console.time('Time elapsed')
    for (let i = 0; i < repos.length; i++) {
        const repoName = repos[i]
        try {
            const data = await fetchRepoData(repoName)
            console.log(`[[Fetching Completed -> ${repoName}]]\n\n`)

            finalData = [...finalData, ...data]
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }

    let leaderboardData = generateRank(finalData).sort((a, b) =>
        a.total_points < b.total_points ? 1 : -1
    )

    let rank = 1, finalLeaderboard = []

    for (let pos = 0; pos < leaderboardData.length; pos++) {
        const currentData = leaderboardData[pos]

        const { full_name, linkedIn } = await getDatafromDB(currentData.user_name);

        if (full_name !== '') {
            currentData.full_name = full_name
            currentData.linkedIn = linkedIn

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
            finalLeaderboard.push(currentData)
        }
    }
    console.timeEnd('Time elapsed')

    return res.status(200).json(
        Response({
            isSuccess: true,
            message: "Leaderboard Updated.",
            data: {
                lastUpdated: new Date(),
                leaderboardData: finalLeaderboard
            }
        })
    )
}


const getDatafromDB = async (userName) => {
    let finalData = { full_name: '', linkedIn: '' }
    try {
        const data = await Mentee.findOne({ github: `https://github.com/${userName}` })
        if (data) {
            finalData.full_name = data.name
            finalData.linkedIn = data.linkedIn
        }
    } catch (err) {
        console.error(err)
    }

    return finalData
}


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
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`,
                    'X-GitHub-Api-Version': '2022-11-28',
                }
            })

            console.log(`Data has been fetched for: ${repoName} and pageCount: ${pageCount}`)
            console.log('------------------------------------------------------------------')

            if (data.length !== 0) {
                const apertreData = filterApertre(data)
                allData = [...allData, ...apertreData]
                pageCount++
            } else {
                pageAvailabe = false
            }
        }
        catch (err) {
            pageAvailabe = false
            throw err
        }
    }

    return allData
}

const filterApertre = (allData) => {
    let finalData = []
    const year = '2024' /* change it to 2024 later */
    const apertreData = allData.filter((prData) => {
        let isApertre = false
        if (prData.merged_at) {
            prData.labels.map((eachLabel) => {
                if (eachLabel.name.toLowerCase().includes(eventLabel.toLowerCase())) {
                    isApertre = true
                }
            })
            if (!prData.created_at.includes(year)) isApertre = false
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
                labels: prData.labels.map((labelData) => labelData.name)
            }
            finalData = [...finalData, data]
        })
    }

    return finalData
}


const generateRank = (fullData) => {
    let finalData = []

    fullData.map((eachPrData) => {
        const index = finalData.findIndex(
            (data) => data.user_name === eachPrData.user_name
        )

        const { point, difficulty } = getPoints(eachPrData.labels)

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
            }

            finalData = [...finalData, userData]
        } else {
            finalData[index].total_points += point
            finalData[index].pr_urls.push({
                url: eachPrData.pr_url,
                difficulty
            })
        }
    })

    return finalData
}


const getPoints = (labelsArray) => {
    let point = 0, difficulty = ''

    labelsArray.map((label) => {
        if (label.toLowerCase().includes(levelsData.easy.toLowerCase())) {
            difficulty = levelsData.easy
            point = 5
        }
        if (label.toLowerCase().includes(levelsData.medium.toLowerCase())) {
            difficulty = levelsData.medium
            point = 10
        }
        if (label.toLowerCase().includes(levelsData.hard.toLowerCase())) {
            difficulty = levelsData.hard
            point = 15
        }
    })

    return { point, difficulty }
}