var express = require("express");
var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname +'/index.html');
});
app.get('/guestbook', function (req, res){
    res.send('Guest!');
});
app.get('/newmessage', function (req, res){
    res.send('Forum!');
});
app.get('/ajaxmessage', function (req, res){
    res.send('something dont know!');
});

app.listen(8081, function(){
    console.log('Example app listetning on port 8081!');
});