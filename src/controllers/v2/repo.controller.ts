import { Request, Response } from "express"
import { ApertreResponse } from "../../utils/Response"
import { db } from "../../lib/config"


export async function getRepos(req: Request, res: Response) {
    //@ts-ignore
    const limit: number = req.query.limit
    //@ts-ignore
    const page: number = req.query.page

    try {
        const repos = await db.repo.findMany()

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: "Repos have been fetched.",
                data: repos
            })
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(
            ApertreResponse({
                isSuccess: false,
                message: "Something went wrong"
            })
        )
    }

}

export async function getUniqueTechStacks(req: Request, res: Response) {
    try {
        const repos = await db.repo.findMany({
            select: {
                techStack: true
            }
        })

        let techStacks: Array<string> = []
        repos.forEach((repo) => {
            techStacks = techStacks.concat(repo.techStack)
        })

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: "Tech stacks have been fetched.",
                data: [...new Set(techStacks)]
            })
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(
            ApertreResponse({
                isSuccess: false,
                message: "Something went wrong"
            })
        )
    }
}
