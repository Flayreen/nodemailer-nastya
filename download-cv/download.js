const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    res.download(path.resolve(__dirname, "../assets", "have-a-good-day.jpeg"));
});

module.exports = router;