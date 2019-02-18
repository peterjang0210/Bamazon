module.exports = function (connection, Sequelize) {
    const Product = connection.define("Product", {
        product_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        department_name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "No Department"
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    return Product;
}