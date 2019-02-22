const db = require('./models');

const items = [
    {
        product_name: "Monopoly",
        department_name: "Board Games",
        price: 30.50,
        stock_quantity: 23
    },
    {
        product_name: "Yatzhee",
        department_name: "Board Games",
        price: 19.95,
        stock_quantity: 40
    },
    {
        product_name: "Iphone X",
        department_name: "Technology",
        price: 999.99,
        stock_quantity: 2
    },
    {
        product_name: "Samsung Galaxy S10",
        department_name: "Technology",
        price: 999.98,
        stock_quantity: 100
    },
    {
        product_name: "PS4",
        department_name: "Video Games",
        price: 299.99,
        stock_quantity: 27
    },
    {
        product_name: "Xbox One",
        department_name: "Video Games",
        price: 299.99,
        stock_quantity: 36
    },
    {
        product_name: "Kitchen Knife",
        department_name: "Kitchen",
        price: 35.99,
        stock_quantity: 2
    },
    {
        product_name: "Ice Cream Machine",
        department_name: "Kitchen",
        price: 49.99,
        stock_quantity: 3
    },
    {
        product_name: "Recliner",
        department_name: "Furniture",
        price: 249.99,
        stock_quantity: 10
    },
    {
        product_name: "Bed",
        department_name: "Furniture",
        price: 199.99,
        stock_quantity: 70
    }
];

db.sequelize.sync({force: true}).then(function(){
    db.Product.bulkCreate(items)
        .then(function(rows){
            console.log("\n\nINSERTED into database\n\n");
            db.sequelize.close();
        }).catch(function(err){
            console.log("\n\nError: ", err);
        });
});