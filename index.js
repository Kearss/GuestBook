// Määritellään palvelimelle portti.
const PORT = process.env.PORT || 8081;

// Otetaan moduuleja käyttöön.
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

// Otetaan body-parser käyttöön express-sovelluksessa.
app.use(bodyParser.urlencoded({ extended: true }));

// Sisältö haetaan public-hakemistosta.
app.use(express.static("./public"));

// Lisätään dataa olemassaolevaan JSON tiedostoon.
app.post("/kirjaudu", function (req, res) {
    // Ladataan dataa JSON tiedostosta muuttujaan.
    var data = require("./public/data.json");
    // Määritellään päivämäärän haku.
    var today = new Date();
    var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    // Luodaan JSON objekti ja lisätään se data-muuttujaan.
    data.push({
        "Email": req.body.email,
        "Salasana": req.body.pass,
        "Date": date
    });
    // Muunnetaan JSON objekti tekstimuotoon.
    var jsonStr = JSON.stringify(data);
    // Kirjoitetaan data JSON tiedostoon.
    fs.writeFile("public/data.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("...It is saved!");
    });
    // Esitetään haluttu data.
    res.send("You send an AJAX message: " + message + ". It is saved to a JSON file");
});


// Luodaan web-palvelin.
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});



//guestbooks code


app.get('/guestbook', function (req, res){
    res.sendFile(__dirname +'/clientview/guest.html');
});
app.get('/', function (req, res){
    res.sendFile(__dirname +'/public/index.html');
});

app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/clientview/message.html');
});

app.post('/newmessage', function (req, res){
    var data = require('./clientview/Dataset.json')
    // creates a new Json object and adds it to a existing data variable
    data.push({
        "Username": req.body.Username,
        "Country": req.body.Country,
        "Message":req.body.Message,
        "Date": new Date()
        });
    //converts Json in to string format 
    var jsonStr = JSON.stringify(data);
    // Kirjoitetaan data JSON tiedostoon.
    fs.writeFile("public/Dataset.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("...It is saved!");
    });
    // Esitetään haluttu data.
    res.send("It is saved to a JSON file");
});









































