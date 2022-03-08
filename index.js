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
    res.render("guestbook.html", {table: table});
    
});
app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/message.html');
});

app.post('/addNewMessage', function (req, res){
    addNewGuest(req.body.name, req.body.country, req.body.message);
    res.redirect("/guestbook.html");
});
// Luodaan web-palvelin.
app.listen(PORT, () => {
    console.log("app listening on port " + PORT);
});

// Helper function for making the HTML-Table out of Guests JSON-data
function makeTable() {
    const guests = require("./dataset.json");
    const guestsFormat = guests.map(guest => (
      `<tr><td class="tohide">${guest.id}</td><td>${guest.username}</td><td>${guest.country}</td><td class="tohide">${guest.date}</td><td>${guest.message}</td></tr>`
    ))
    .reduce((prevValue, curValue) => prevValue + curValue);
  
    return (`<table class="table"><thead class="thead-dark"><tr><th class="tohide">ID</td><th>Name</th><th>Country</th><th class="tohide">Date</th><th>Message</th></tr></thead><tbody>
    ${guestsFormat}
    </tbody></table>`);
  }

  //Helper function to add a new Guest to local variable and JSON file
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