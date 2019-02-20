const path = require("path");

module.exports = function (app) {
    app.get("/manager", function (req, res){
        res.sendFile(path.join(__dirname, "../public/manager.html"));
    });

    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("*", function(req, res){
        res.json("Enter a valid URL");
    })
}