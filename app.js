const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res){
  const city = req.body.cityName;
  const apiKey = "e6756d050a3649659dc83cb492bfb2ea";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit+ "";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const descrip = weatherData.weather[0].description;

      res.write("<h1>The temperature in "+ city +" is " + temp + " degree Celcius.</h1>")
      res.write("<h2>The Weather condition is " + descrip + ".</h2>")
      res.send()
      console.log(temp)
      console.log(descrip)
    })
  });

});


app.listen(3000, function(){
  console.log("Sever is running on port 3000.");
});
