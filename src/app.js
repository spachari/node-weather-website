const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get("", (req, res) => {
  res.render("index", {
    title : "Weather App",
    name : "Srinivas Pachari"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Srinivas Pachari"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    helpText : "This is some helpful text",
    title: "Help",
    name: "Srinivas Pachari"
  })
})

app.get("/weather", (req, res) => {
  console.log(req.query)
  console.log(req.query.address)
  if (!req.query.address) {
    return res.render("404", {
      title: "404",
      name: "Srinivas Pachari",
      errorText: "Address not provided"
    })
  }

  geocode(req.query.address, (geocodeError, {latitude, longitude, location} = {}) => {
    if (geocodeError) {
      return res.render("404", {
        title: "404",
        name: "Srinivas pachari",
        errorText: geocodeError
      })
    }

      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          return res.render("404", {
            title: "404",
            name: "Srinivas pachari",
            errorText: forecastError
          })
        }

          res.send({
            address : req.query.address,
            location : location,
            forecastData : forecastData.temparatureData,
            humidity : forecastData.humidity
          })

      })
  })
})


app.get("/help/*", (req,res) => {
  res.render("404", {
    title: "404",
    name: "Srinivas Pachari",
    errorText: "Help article not found"
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Srinivas Pachari",
    errorText: "Page not found"
  })
})

app.listen(port, () => {
  console.log("Server is up on port " + port)
})
