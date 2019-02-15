var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/blog_demo");



var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema],
});

var User = mongoose.model("User", userSchema);


/*var newUser = new User({
    email:"hermioni@hogwarts.edu",
    name: "Hermioni Granger"
});

newUser.posts.push({
    title:"How to brew polyjuice potions",
    content:"Just kidding go to potions class to learn it"
})

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});*/

/*var newPost = new Post({
    title: "Reflections on Apples",
    content: "They are delicious"
});

newPost.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});*/

User.findOne({name: "Hermioni Granger"} , function(err, user){
    if(err){
        console.log(err)
    } else {
        user.posts.push({
            title: "Three things I really hate",
            content: "Voldermort. Voldermot. Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user)
            }
        });
    }
});