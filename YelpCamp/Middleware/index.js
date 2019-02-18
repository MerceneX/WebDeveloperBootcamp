const Campground = require("../Models/campgrounds"),
	Comment = require("../Models/comments");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	} else {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err || !foundCampground) {
				req.flash("error", "Campground not found middleware");
				res.redirect("back");
			} else {
				if (foundCampground.author.id.equals(req.user.id)) {
					return next();
				} else {
					req.flash("error", "You don't have permissions to do that");
					res.redirect("back");
				}
			}
		});
	}
};

middlewareObj.checkCommentsOwnership = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	} else {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err || !foundComment) {
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				if (foundComment.author.id.equals(req.user.id)) {
					return next();
				} else {
					req.flash("error", "You don't have permissions to do that");
					res.redirect("back");
				}
			}
		});
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
};

module.exports = middlewareObj;
