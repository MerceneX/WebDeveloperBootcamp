var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/blog_demo_references");

var Post = require("./Models/Post");
var User = require("./Models/User");

Post.create({
    title: "How to cook the best burger pt. 4",
    content: "Pt 4 of Even more blah"
}, function (err, post) {
    User.findOne({
        email: "bob@gmail.com"
    }, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            foundUser.posts.push(post)
            foundUser.save(function(err, data){
                if(err){
                    console.log(err)
                } else {
                    console.log(data)
                }
            });
        }
    });
});

/*User.findOne({
    email: "bob@gmail.com"
}).populate("posts").exec(function (err, user) {
    if(err){
        console.log(err);
    } else {
        console.log(user)
    }
});*/



/*User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
});*/