const db = require(`../models`);

module.exports = function (app) {
    app.get("/api/products", function(req, res){
        db.Products.findAll({}).then(function(data){
            res.json(data);
        }).catch(function(error){
            res.json({error: error});
        });
    });

    app.get("/api/products/:productName", function(req, res) {
        const selected = req.params.productName;
        db.Products.findOne({where: {
            name: selected
        }}).then(function(data){
            res.json(data);
        }).catch(function(error){
            res.json({error: error});
        });
    });

}