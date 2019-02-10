const app = require("express")(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.set("view engine", "ejs");
app.use(bodyParser());

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var newCampground = {
        name : req.body.name,
        image : req.body.image,
        description : req.body.description
    }
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCG){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCG});
        }
    });
    
});

app.listen(3000, "localhost", function () {
    console.log("Server started");
});