const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./Models/campgrounds"),
    Comment = require("./Models/comments"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));
seedDB();



app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCG) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {
                campground: foundCG
            });
        }
    });
});

// ===================
// Comments
// ===================

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("Comments/new", {
                campground: campground
            });
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});


app.listen(3000, "localhost", function () {
    console.log("Server started");
});