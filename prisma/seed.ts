import { db } from "../src/lib/config"
// import mentees from "./mentees.json"

const seed = async () => {
    console.log("Seeding DB...")

    // for (const mentee of mentees) {
    //     const res = await db.mentees.create({
    //         data: {
    //             name: mentee.name,
    //             email: mentee.email,
    //             phone: "1234567890",
    //             linkedIn: "jhjagfjsgjfgshjfgjhsgfjhsgf",
    //             github: mentee.github,
    //             college_or_org: mentee.collegeOrOrg,
    //             gender: "Male",
    //             address: "Anything",
    //         }
    //     })

    //     console.log("Created", res)
    // }
}

seed()
    .then(async () => {
        await db.$disconnect()
        console.log("DB seeded successfully.")
    })
    .catch(async (err) => {
        console.error(err)
        await db.$disconnect()
        process.exit(1)
    })