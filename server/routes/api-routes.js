const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

//const newsUrl = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_SECRET}&q=`;
const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_SECRET}`;
//https:newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY

router.get("/", async (req, res) => {
  try {
    const urlWithQuery = newsUrl; // + req.query.q;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data.articles);
  } catch (err) {
    res.json({ msg: err });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const urlWithQuery = newsHeadlinesUrl + req.query.q;
//     const newres = await axios.get(urlWithQuery);
//     res.json(newres.data.articles);
//   } catch (err) {
//     res.json({ msg: err });
//   }
// });

module.exports = router;
