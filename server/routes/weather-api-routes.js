const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${process.env.WEATHER_SECRET}`;

router.get("/", async (req, res) => {
  try {
    const urlWithQuery = weatherUrl; // + req.query.q;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
