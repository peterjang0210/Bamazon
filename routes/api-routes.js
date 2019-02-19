const db = require("../models");

module.exports = function (app) {
    app.get("/api/products", function (req, res) {
        db.Product.findAll({}).then(function (data) {
            res.json(data);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    app.get("/api/products/:id", function (req, res) {
        db.Product.findOne({
            where: {
                product_name: req.params.productName
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    app.post("/api/products", function (req, res) {
        db.Product.create(req.body)
            .then(function (data) {
                res.json("success");
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    app.put("/api/products/:id", function (req, res) {
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (data) {
            res.json("success");
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    app.delete("/api/products/:id", function (req, res) {
        db.Product.destroy(
            {
                where:
                    { id: req.params.id }
            }).then(function (data) {
                res.json("success");
            }).catch(function(error){
                res.json({error: error});
            });
    });
}