const PORT = process.env.PORT || 8081;
var express = require("express");
var fs = require("fs");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res){
    res.sendFile(__dirname +'/index.html');
});

app.get('/guestbook', function (req, res){
    var data = require('./Dataset.json')
    res.sendFile(__dirname +'/guest.html');
});

app.get('/newmessage', function (req, res){
    res.sendFile(__dirname +'/message.html');
});

app.post('/newmessage', function (req, res){

    var data = require('./Dataset.json')
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
    res.sendFile(__dirname +'/ajax.html');
});


app.listen(PORT, function(){
    console.log('Example app listening on port 8081!' + PORT);
});