const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User = require("./Models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {
	useNewUrlParser: true
});
app.use(
	require("express-session")({
		secret: "Rusty",
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===================
//  ROUTES
//===================

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});

// Auth routes

app.get("/register", function(req, res) {
	res.render("register");
});

app.post("/register", function(req, res) {
	req.body.username;
	req.body.password;
	User.register(
		new User({ username: req.body.username }),
		req.body.password,
		function(err, user) {
			if (err) {
				console.log(err);
				return res.render("register");
			} else {
				passport.authenticate("local")(req, res, function() {
					res.redirect("/secret");
				});
			}
		}
	);
});

app.get("/login", function(req, res) {
	res.render("login");
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login"
	}),
	function(req, res) {}
);

app.get("/logout", function(req, res) {
	req.logOut();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, "localhost", function() {
	console.log("Server Started");
});
