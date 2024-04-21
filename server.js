const express = require("express");
require('dotenv').config()
const mailConfig = require("./configs/mail-config");
const mailSender = require("./send-mail/sender");
//
const app = express();

app.use(express.json());




app.post("/mail", (req, res) => {
    // Send to user
    mailSender(mailConfig, {
        from: {
            name: "Oleg Vakarchuk",
            address: process.env.MY_EMAIL
        },
        to: [req.body.email],
        subject: "Congratulation!",
        text: `Hello ${req.body.name}! I will contact you soon`
    }, );

    // Send to me
    mailSender(mailConfig, {
        from: {
            name: "Oleg Vakarchuk",
            address: process.env.MY_EMAIL
        },
        to: [process.env.MY_EMAIL],
        subject: `You have new message from ${req.body.name}!`,
        text: `
            \n Name: ${req.body.name}
            \n Email: ${req.body.email}
            \n Text: ${req.body.text} 
        `
    }, );

    res.status(200).json({
        message: "Mail has been sent"
    })
})



app.listen(process.env.PORT, (err) => {
    err
        ? console.log(err)
        : console.log(`Server is running`);
})
