const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/calendar", (req, res) => {
  try {
    res.render("calendar");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/history", async (req, res) => {
  try {
    res.render("history");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/holidays", async (req, res) => {
  try {
    res.render("holidays");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/convert", async (req, res) => {
  const { date } = req.body;
  try {
    const response = await axios.get(
      `https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`
    );
    const convertedDate = response.data.hebrew;
    const events = response.data.events;
    res.render("index", {
      convertedDate,
      originalDate: date,
      eventsOnDate: events,
    });
  } catch (error) {
    console.error(error);
    res.render("index");
  }
});

app.post("/translate", async (req, res) => {
  const text = req.body.userInput;
  const encodedParams = new URLSearchParams();
  encodedParams.set("q", text);
  encodedParams.set("target", "he");
  encodedParams.set("source", "en");

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "fc29908c25msh28713add27a273ep1937e2jsn6517b15f4677",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    const translatedText = response.data.data.translations[0].translatedText;
    res.render("index", { data: translatedText });
    console.log(translatedText);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
