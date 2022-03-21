const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const newsUrl = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_SECRET}&q=`;

router.get("/", async (req, res) => {
  try {
    const urlWithQuery = newsUrl + req.query.q;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data.articles);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
