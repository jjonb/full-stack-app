const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5050;
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/news", require("./routes/news-api-routes"));
app.use("/weather", require("./routes/weather-api-routes"));

app.listen(PORT, () => {
  if (process.env.NEWS_SECRET === undefined) {
    throw new Error(
      `You must create a .env file with 'NEWS_SECRET' as a key, and an api key from newsapi.org as the value

        Example: /.env
        NEWS_SECRET=<your key here>
        `
    );
  }

  console.log(`listening at http://localhost:${PORT}`);
});
