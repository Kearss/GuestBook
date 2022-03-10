// Määritellään palvelimelle portti.
const PORT = process.env.PORT || 3000;

// Otetaan moduuleja käyttöön.
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

// Otetaan body-parser käyttöön express-sovelluksessa.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', function (req, res){
    res.sendFile(__dirname +'/public/index.html');
});


app.get("/guestbook", (req, res) => {
    let data = require("./dataset.json");
    var bootstrap = "<link rel="+'stylesheet'+" href=https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css></link>"
    let results ="<header style = 'background-color: rgba(29, 28, 28, 0.89);' >"+
    "<nav><ul style= 'width: 100%;padding-top: 15px;list-style: none;display: flex;justify-content: space-evenly;align-items: center;flex-wrap: wrap;'><li><a href='/'>Home</a></li>" +""+ 
    "<li><a href='/guestbook'>Guestbook</a></li>"+""+
    "<li><a href='/newmessage'>New Message</a></li>"+""+
    "<li><a href='/ajaxmessage'>New Ajax Message</a></li></nav></header>"+
    bootstrap+"<table class='table' style='width: 100%'> <thead class='thead-dark'>" +
    '<tr><th>Name</th><th>Country</th><th>Date</th><th>Message</th></tr>';
    for (let i = 0; i < data.length; i++) {
      results +=
        '<tr>' +
        '<td>' + data[i].username + '</td>' +
        '<td>' + data[i].country + '</td>' +
        "<td>" + data[i].date + "</td>" +
        '<td>' + data[i].message + '</td>' +
        '</tr>';
    }
    results += "</table>";
    res.send(results);
  });

app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/public/message.html');
});

app.post('/newmessage', function (req, res){
    var data = require("./dataset.json");
    // Tehdään if/else -lause, joka tarkistaa onko tyhjiä kenttiä. Jos yksikin kentistä on tyhjä, niin sivu latautuu uudelleen. //
    if (req.body.username == "" || req.body.country == "" || req.body.message == "") {
        res.redirect("/newmessage")
    } else {
        // Lähetetään lomakkeed tiedot JSON-muodossa serverille ja tallennetaan ne guestbook.json tiedostoon. //
        data.push({
            "username": req.body.username,
            "country": req.body.country,
            "date": new Date(),
            "message": req.body.message
        });

        var jsonStr = JSON.stringify(data);

        fs.writeFile(__dirname + "/public/dataset.json", jsonStr, (err) => {
            if (err) throw err;
            console.log("Data saved!")
        });
        // Kun kaikki on valmista, ohjataan käyttäjä "/guestbook" sivulle. //
        res.redirect("/guestbook")
    }
});
// Luodaan web-palvelin.
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});

function addToGuestbook(req) {
    let data = require("./dataset.json");
  
    data.push({
      "username": req.body.name,
      "country": req.body.country,
      "date": new Date(),
      "message": req.body.message
    });
  
    let jsonStr = JSON.stringify(data);
  
    fs.writeFile("./data.json", jsonStr, (err) => {
      if (err) throw err;
    });
  }