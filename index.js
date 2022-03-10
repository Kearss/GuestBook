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

// Luodaan reitti, joka hakee JSON-tiedoston ja parsii sen taulukkoon. //
// Tein tämän kohdan alusta asti hieman väärin, joten visuaalinen muokkaaminen Bootstrapin avulla jäi pois, koska en tajunnut tehdä html-sivua, johon taulukko tulostuu. //
app.get("/guestbook", function (req, res) {
    res.sendFile(__dirname +'/public/guest.html');
    var json = require(__dirname + "/public/guestbook.json");
    var bootstrap = "<link rel="+'stylesheet'+" href=https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css></link>"
    var results = bootstrap + "<table class='table table-striped'><tr><th>Name</th><th>Country</th><th>Date</th><th>Message</th></tr>";

    for (var i = 0; i < json.length; i++) {
        results +=
            "<tr>" +
            "<td>" + json[i].username + "</td>" +
            "<td>" + json[i].country + "</td>" +
            "<td>" + json[i].date + "</td>" +
            "<td>" + json[i].message + "</td>" +
            "</tr>";
    } results += "</table>"
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