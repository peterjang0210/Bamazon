const express = require('express');
const path = require("path");
const faker = require("faker");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    });

    //generate 10 products using faker.js
    // db.Product.findAll().then(function (products) {
    //     for(let i = 0; i < 10; i++){
    //         db.Product.create({
    //             product_name: faker.commerce.productName(),
    //             department_name: faker.commerce.department(),
    //             price: faker.commerce.price(),
    //             stock_quantity: faker.random.number()
    //         }).then(function (data) {
    //             console.log("success");
    //         }).catch(function (error) {
    //             console.log({ error: error });
    //         })
    //     }
    // })

});
