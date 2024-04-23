const express = require("express");
const cors = require("cors");
require('dotenv').config()
const mailConfig = require("./configs/mail-config");
const mailSender = require("./send-mail/sender");
const downloader = require("./download-cv/download")
//
const app = express();

app.use(cors({
    origin: 'https://flayreen.github.io'
}));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://flayreen.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use("/download", downloader)




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

