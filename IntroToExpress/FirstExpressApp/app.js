var express = require("express");

var app = express();

app.get("/", function(req, res){
    res.send("Hi There");
});

app.get("/bye", function(req, res){
    res.send("Goodbye");
});

app.get("/dog", function(req, res){
    res.send("Meow");
});

app.get("/r/:subredditName",function(req,res){
    res.send("Welcome to the " + req.params.subredditName + " subreddit");
});

app.get("*", function(req, res){
    res.send("You're a star");
});

app.listen(3000, 'localhost', function(){
    console.log("Begin");
});