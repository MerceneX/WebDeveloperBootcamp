const express = require("express"),
    app = express(),
    bParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index",{blogs:blogs});
        }
    });
});

app.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index",{blogs:blogs});
        }
    });
});

app.get("/blogs/new", function(req, res){
    res.render("new");
})

app.listen(30