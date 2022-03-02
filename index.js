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


app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});