const express = require("express"),
	router = express.Router({ mergeParams: true }),
	Campground = require("../Models/campgrounds"),
	Comment = require("../Models/comments"),
	middleware = require("../Middleware");

router.get("/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err || !campground) {
			console.log(err + "\nBroke me");
		} else {
			res.render("Comments/new", {
				campground: campground
			});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err || !campground) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Successfully added comment!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

router.get("/:comment_id/edit", middleware.checkCommentsOwnership, function(
	req,
	res
) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err || !foundComment) {
			console.log(err);
		} else {
			res.render("Comments/edit", {
				campgroundID: req.params.id,
				comment: foundComment
			});
		}
	});
});

router.put("/:comment_id", middleware.checkCommentsOwnership, function(
	req,
	res
) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
		err,
		comment
	) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:comment_id", middleware.checkCommentsOwnership, function(
	req,
	res
) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err, deleted) {
		if (err) {
			req.flash("error", err);
		} else {
			req.flash("succes", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;
