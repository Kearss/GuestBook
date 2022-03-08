// Määritellään palvelimelle portti.
const PORT = process.env.PORT || 8000;

// Otetaan moduuleja käyttöön.
const guests = require("./dataset.json");
const fs = require("fs");
const express = require("express");
const app = express();


// Otetaan body-parser käyttöön express-sovelluksessa.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res){
    res.sendFile(__dirname +'/index.html');
});

app.get('/guestbook', function (req, res){
    res.sendFile(__dirname +'/guest.html');
});
app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/message.html');
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
    console.log("app listening on port " + PORT);
});