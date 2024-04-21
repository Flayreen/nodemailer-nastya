const sendEmail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent")
    } catch (error) {
        console.error(error)
    }
}

module.exports = sendEmail;