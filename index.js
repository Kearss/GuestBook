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
    const table = makeTable;
    res.sendFile(__dirname +'/guest.html');
});
app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/message.html');
});

app.post("/addNewMessage", (req, res) => {
    addNewGuest(req.body.name, req.body.country, req.body.message);
    res.redirect("/guestbook");
  })

// Luodaan web-palvelin.
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});

function addNewGuest(username, country, message) {
    const newGuestObject = {
      id: guests.length + 1,
      username: username,
      country: country,
      date: Date(),
      message: message
    }
    guests.push(newGuestObject);
  
    const guestsString = JSON.stringify(guests);
  
    fs.writeFile("guests.json", guestsString, (err) => {
      if (err) throw err;
      console.log("Guest has been saved!");
    })
  }