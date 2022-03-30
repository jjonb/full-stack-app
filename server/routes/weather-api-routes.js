const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=37&lon=-122&units=Imperial&appid=${process.env.WEATHER_SECRET}`;
const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/reverse?limit=5&appid=${process.env.WEATHER_SECRET}&`;

router.get("/", async (req, res) => {
  try {
    const urlWithQuery = weatherUrl; // + req.query.q;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get("/geo", async (req, res) => {
  try {
    const urlWithQuery =
      geoLocationUrl +
      "longitude=" +
      req.query.longitude +
      "&" +
      "latitude=" +
      req.query.latitude;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.name);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
