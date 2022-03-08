// Määritellään palvelimelle portti.
const PORT = process.env.PORT || 3000;

// Otetaan moduuleja käyttöön.
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

// Otetaan body-parser käyttöön express-sovelluksessa.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
    res.render("pages/index.html");
});

app.get('/guestbook', function (req, res){
    res.render("pages/index.html");
});
app.get('/newmessage', function (req, res){
    res.render("pages/index.html");
});

app.post('/newmessage', function (req, res){
    var data = require("./dataset.json");
    // creates a new Json object and adds it to a existing data variable
    data.push({
        "Username": req.body.Username,
        "Country": req.body.Country,
        "Date": new Date(),
        "Message":req.body.Message
        });
    //converts Json in to string format 
    var jsonStr = JSON.stringify(data);
    // Kirjoitetaan data JSON tiedostoon.
    fs.writeFile("dataset.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("...It is saved!");
    });
    // Esitetään haluttu data.
    res.send("It is saved to a JSON file");
});
// Luodaan web-palvelin.
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});