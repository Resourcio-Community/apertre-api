import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'


let nodeConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeConfig)

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Resourcio Community',
        link: 'https://www.linkedin.com/company/resourcio-community2022/'
    }
})

export async function sendMail(name: string, email: string, isMentee = true) {
    console.log(isMentee)
    let mail

    if (isMentee) {
        mail = {
            body: {
                name: name,
                signature: false,
                intro: "Welcome to Apertre | Successfully Registered as Mentee",
                outro: "Best of Luck from Resourcio Community"
            }
        }
    }
    else {
        mail = {
            body: {
                name: name,
                signature: false,
                intro: "Welcome to JWOC | Successfully Registered as Mentor",
                outro: "Best of Luck from Resourcio Community"
            }
        }
    }


    var emailBody = MailGenerator.generate(mail)

    let message = {
        from: process.env.EMAIL,
        to: email,
        subject: "Apertre Registration",
        html: emailBody
    }

    transporter.sendMail(message)
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })
}
