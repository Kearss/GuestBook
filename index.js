var express = require("express");
var fs = require("fs");
var app = express();

var bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res){
    res.sendFile(__dirname +'/index.html');
});
app.post('/', function (req, res){
    var data = require('./Dataset.json')
    data.push({
        "Name": req.body.Name,
        "User": req.body.User,
        "Message":req.body.Message,
        "Date": new Date()
        });
    var jsonStr = JSON.stringify(data);

    fs.writeFile('Dataset.json', jsonStr,(err)=>{
        if(err) throw err;
        console.log('it\'s saved!');
    });
    res.send("Saved the data to a file. Browse to the /guestbook to see the contents of the file");
    });

app.get('/guestbook', function (req, res){
    var data = require('./Dataset.json')
    var result= '<table border ="1">';
    for (var i=0; i< data.length; i++){
        result +=
        '<tr>'+
        '<td>'+data[i].Name+'</td>'+
        '<td>'+data[i].User+'</td>'+
        '</tr>';
    }
    res.send(result);
    
});

app.get('/newmessage', function (req, res){
    var data = require('./Dataset.json')

    var result= '<table border ="1">';
    for (var i=0; i< data.length; i++){
        result +=
        '<tr>'+
        '<td>'+data[i].Name+'</td>'+
        '<td>'+data[i].Email+'</td>'+
        '</tr>';
    }
    res.send(result);


    var jsonStr = JSON.stringify(data);

    fs.writeFile('Dataset.json', jsonStr,(err)=>{
        if(err) throw err;
        console.log('it\'s saved!');
    });
    res.send("Saved the data to a file. Browse to the /details to see the contents of the file");

});


app.get('/ajaxmessage', function (req, res){
    res.send('something dont know!');
});

app.listen(8081, function(){
    console.log('Example app listetning on port 8081!');
});