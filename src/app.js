const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// port configuration
const port = process.env.PORT || 3000;

// Defining Path
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
// setup handlebars and and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

// Home
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    description: "Root page",
  });
});

// hbs
hbs.registerPartials(partialPath);

// Help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    description: "this page contains all the help you needed",
  });
});

// About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "john Merga",
    type: "Model",
  });
});

//weather
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "address is not provided",
    });
  }

  // geoCode function
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        foreCastData,
      });
    });
  });
});

// check
// app.get("/check", (req, res) => {
//   const address = req.query.address;
//   const name = req.query.name;
//   if (!address) {
//     return res.send({ error: "Please provide an address" });
//   }
//   // geocode
//   geoCode(address, (error, { latitude, longitude }) => {
//     if (error) {
//       return res.send({ error });
//     }
//     forecast(latitude, longitude, (error, data) => {
//       if (error) {
//         return res.send({ error });
//       }
//       res.send({ data, Location: address });
//     });
//   });
//   //
// });
// unknown paths

app.get("/help/me/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(" server started running on port  " + port);
});
