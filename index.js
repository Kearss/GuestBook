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
app.use(express.static("./publicview"));

app.get('/', function (req, res){
    res.sendFile(__dirname +'/index.html');
});

app.get('/guestbook', function (req, res){
    res.sendFile(__dirname +'/publicview/guest.html');
});

app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/publicview/message.html');
});

app.post('/newmessage', function (req, res){

    var data = require('./publicview/Dataset.json')
    // creates a new Json object and adds it to a existing data variable
    data.push({
        "Username": req.body.Username,
        "Country": req.body.Country,
        "Message":req.body.Message,
        "Date": new Date()
        });
    //converts Json in to string format 
    var jsonStr = JSON.stringify(data);
    //writes data to file
    fs.writeFile('Dataset.json', jsonStr,(err)=>{
        if(err) throw err;
        console.log('it\'s saved!');
    });
    res.send("Saved the data to a file. Browse to the /guestbook to see the contents of the file");
});

app.get('/ajaxmessage', function (req, res){
    res.sendFile(__dirname +'/publicview/ajax.html');
});


app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});