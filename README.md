# Full Stack Project!

## Recap <br>

This is a full stack project; A dedicated client side + dedicated server side. The goal is to be able to make a request to the open news api AND protect our API key. A template has been created for you that protects your api key. You will need to make a request to the servers end point and display the data that gets returned.

You are highly encouraged to think with your team about how you can make this app better.

## Ideas:

- Search for something other than Pandas (front end)
- Instead of always looking up pandas make the search dependent on a users input? (front end)
- Find another endpoint to hit and modify the route in the backend. (front end + backend)
- Tie in the open weather map api (protect the api key) (front end + backend)

## Min <br>

- Display a request from the news API.
- Make an app you enjoy the look and feel of

<em>Note:</em> create accounts and get an API key for:

- [news api](https://newsapi.org/)
- [weathermap](https://openweathermap.org/api) (bonus)

<br>

After cloning this repo you will need to create a .env file in the servers root directory and use your api key:

`./server/.env`

```
NEWS_SECRET=<your_api_key_here>
```

An example request has been made to get a list of news related to "Pandas". You can use this to start the project.

`./requests/App.js`:

```js
const newsResponse = await axios.get("http://localhost:5050/api?q=Pandas");
setArticles(newsResponse.data);
```

This works because of the routes "endpoint":
`./server/routes/api-routes.js`

```js
const urlWithQuery = newsUrl + req.query.q;
const newres = await axios.get(urlWithQuery);
res.json(newres.data.articles);
```

# Groups

```
Group 1

> Hiwot Segenet
> Amele Alemu
> Linda Westphal
> William Brand

Group 2

> Sergut Tibebu
> Jesse Bellido
> Angel Barranco
> Beakal Degafe

Group 3

> Anthony Perry
> Lisa Yang
> Ezer Angeles
> Yiley Belete

```

## Deadline: 💀

No deadline. When I get back we'll do a progress check to see where you are at, and make the decision where we go from there. Im excited to see what you all come up with.

<br>

## Support: 💪

The react web team has all worked with server side code before. Reach out to them on Gather for help if you need it.
