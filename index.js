// finalized port
const PORT = process.env.PORT || 3000;

// adding modules.
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// creating homepage route
app.get('/', function (req, res){
    res.sendFile(__dirname +'/public/index.html');
});

//creating a /guestbook route
app.get("/guestbook", (req, res) => {
    let data = require("./dataset.json");
    //Adding bootstrap to js
    var bootstrap = "<link rel="+'stylesheet'+" href=https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css></link>"
    // creating a table 
    let results ="<header style = 'background-color: rgba(29, 28, 28, 0.89);' >"+
    "<nav style ='display: flex;align-items: center;justify-content: center;'>"+
    "<ul style= 'width: 100%;padding-top: 15px;list-style: none;display: flex;justify-content: space-evenly;align-items: center;flex-wrap: wrap;'>"+
    "<li><a style:'color: white;font-size: 20px;' href='/'>Home</a></li>"+
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
    //sending  table data
    results += "</table>";
    res.send(results);
  });
// creating message route
app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/public/message.html');
});
// creating a message post route for message
app.post('/newmessage', function (req, res){
    var data = require("./dataset.json");
    // creating if/else function to require the field to be filled 
    if (req.body.username == "" || req.body.country == "" || req.body.message == "") {
        alert("Empty fields are not allowed!")
    } else {
        // sends the data to dataset.json and adds it to the json file
        data.push({
            "username": req.body.username,
            "country": req.body.country,
            "date": new Date(),
            "message": req.body.message
        });

        var jsonStr = JSON.stringify(data);

        fs.writeFile(__dirname + "/dataset.json", jsonStr, (err) => {
            if (err) throw err;
            console.log("Data saved!")
        });
        // redirect the user to the /guestbook
        res.redirect("/guestbook")
    }
});
// creating ajax message
app.get('/ajaxmessage', function (req, res){
    res.sendFile(__dirname +'/public/ajax.html');
});
// creating ajax post 
app.post("/ajaxmessage", function (req, res) {
    var data = require("./dataset.json");
    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "date": new Date(),
        "message": req.body.message
    });
    var jsonStr = JSON.stringify(data);
    fs.writeFileSync(__dirname + "./dataset.json", jsonStr);
    res.sendFile(__dirname + "./dataset.json")
})


  // creating server
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});