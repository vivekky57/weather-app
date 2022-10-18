const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//SEtup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vivek Yadav",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vivek  Yadav",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is help page!",
    title: "Help Page",
    name: "Vivek Yadav",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: error,
            });
          }
          res.send({
            location: location,
            forecast: forecastData,
            address: req.query.address,
          });
        });
      }
    );
  }

  // res.send({
  //   forecast: "It is snowing",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Vivek Yadav",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "My 404 page",
    name: "Vivek Yadav",
  });
});
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
