import Repo from "../db/models/Repo.js"
import { Response } from "../utils/Response.js"

export const getRepos = async (req, res) => {
    try {
        const repos = await Repo.find().select('-address -email')

        return res.status(200).json(
            Response({
                isSuccess: true,
                message: "Repos have been fetched.",
                data: repos
            })
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(
            Response({
                isSucess: false,
                message: "Something went wrong"
            })
        )
    }
}

export const getUniqueTechStacks = async (req, res) => {
    
}