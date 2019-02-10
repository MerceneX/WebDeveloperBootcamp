const app = require("express")();
const request = require("request");

app.set("view engine", "ejs");

app.get("/results", function (req, res) {
    request("http://omdbapi.com/?s="+req.query.searchTxt+"&plot=full&type=series&apikey=thewdb", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body);
            console.log(results)
            res.render("results", {
                data : results,
                srch : req.query.searchTxt
            });
        }
    });
});

app.get("/",function(req, res){
    res.render("search");
});

app.listen(3000, "localhost", function () {
    console.log("server started");
});