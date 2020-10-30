//this is the client side javascript that is going to run
//in the browser

const weatherForm = document.querySelector("form") //to control weatherForm do this
const searchElement = document.querySelector("input") //get the data passed in via <form> </form>
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

/*
Fetch API is not js, but it is browser based API.
This can be used in all mordern browsers. But it is not accessible in node.js

This code will run in client side java script, so using the fetch APi is
perfectly fine
*/

const getWeatherData = (address) => fetch("http://localhost:3000/weather?address=" + address).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecastData
    }
  })
})


weatherForm.addEventListener("submit", (event) => {
  event.preventDefault() //this prevents auto refresh

  const location = searchElement.value

  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""

  const weatherData = getWeatherData(location)
})
