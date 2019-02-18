const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./Models/campgrounds"),
	Comment = require("./Models/comments"),
	User = require("./Models/user"),
	seedDB = require("./seeds"),
	methodOverride = require("method-override"),
	flash = require("connect-flash");

const commentRoutes = require("./Routes/comments"),
	campgroundRoutes = require("./Routes/campgrounds"),
	indexRoutes = require("./Routes/index");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.use(
	require("express-session")({
		secret: "Once again Rusty wins cutest dog!",
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, "localhost", function() {
	console.log("Server started");
});
