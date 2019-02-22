const render = function (products) {
    $(".productTable").empty();
    for (let i = 0; i < products.length; i++) {
        $(".productTable").append(
            `<tr>
                <td><input type="number" class="form-control" id="customerInput${i + 1}"></td>
                <td>${products[i].product_name}</td>
                <td>${products[i].stock_quantity}</td>
                <td>$ ${products[i].price}</td>
                <td class="addToCart" data-productID=${products[i].id}>+</td>
            </tr>`);
    }
}

const getAllProducts = function () {
    $.get("/api/products").then(function (products) {
        render(products)
    })
}

const cart = [];
const addToCart = function () {
    const productID = $(this).attr("data-productID");
    $.get(`/api/products/${productID}`).then(function (product) {
        if ($(`#customerInput${product.id}`).val() > product.stock_quantity || $(`#customerInput${product.id}`).val() === "") {
            $(".alertBlock").empty();
            $(".alertBlock").prepend(`<div class="alert alert-danger" role="alert">
            Please enter a number below the stock quantity!
          </div>`);
        }
        else {
            const cartItem = {
                name: product.product_name,
                id: product.id,
                quantityOrdered: $(`#customerInput${product.id}`).val(),
                price: product.price
            }
            cart.push(cartItem);
            $(".alertBlock").empty();
            $(".alertBlock").prepend(`<div class="alert alert-success" role="alert">
            Your item has been added to the cart!</div>`);
            $(`#customerInput${product.id}`).val("");
        }
    })
}

const renderCart = function () {
    $(".modalTable").empty();
    $(".orderTotal").empty();
    for (let i = 0; i < cart.length; i++) {
        $(".modalTable").append(
            `<tr>
                <td>${cart[i].quantityOrdered}</td>
                <td>${cart[i].name}</td>
                <td>$ ${cart[i].price}</td>
                <td>$ ${cart[i].quantityOrdered * cart[i].price}</td>
                <td class="deleteFromCart" id="productID" data-cartIndex=${i}>-</td>
            </tr>`);
        if (i === cart.length - 1) {
            let orderTotal = 0;
            for (let j = 0; j < cart.length; j++) {
                orderTotal += (cart[j].quantityOrdered * cart[j].price);
            }
            $(".modal-body").append(`<div class="orderTotal">Price at Checkout: $${orderTotal}</div>`);
        }
    }
    if (cart.length === 0) {
        $(".modal-body").append("Your Cart is Empty");
    }
    $("#cartModal").modal("show");
}

const removeFromCart = function () {
    const cartIndex = $(this).attr("data-cartIndex");
    cart.splice(cartIndex, 1);
    renderCart();
}

const checkOut = function () {
    for (let i = 0; i < cart.length; i++) {
        $.get(`/api/products/${cart[i].id}`).then(function (product) {
            $.ajax({
                url: `api/products/${product.id}`,
                method: "PUT",
                data: {
                    product_name: product.product_name,
                    department_name: product.department_name,
                    price: product.price,
                    stock_quantity: product.stock_quantity - cart[i].quantityOrdered
                }
            }).then(function () {
                $(".modalTable").empty();
                $(".orderTotal").empty();
                $(".modalTable").append(`<div>Items have been purchased!</div>`);
                getAllProducts();
                cart.length = 0;
            });
        })
    }
}

const getProductsM = function () {
    const id = this.id;
    $.get("/api/products").then(function (products) {
        if (id === "viewProducts") {
            renderAllProducts(products);
        }
        else if (id === "viewLowInven") {
            renderLowProducts(products);
        }
        else if (id === "addToInven") {
            renderAddInven(products);
        }
        else if (id === "addNewProd") {
            renderNewProduct();
        }
    });

}

const renderAllProducts = function (products) {
    $(".tableBlock").empty();
    $(".tableBlock").append(
        `<table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Amount in Stock</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody class="productTableM">
            </tbody>
        </table>`);
    for (let i = 0; i < products.length; i++) {
        $(".productTableM").append(
            `<tr>
                <td>${products[i].id}</td>
                <td>${products[i].product_name}</td>
                <td>${products[i].stock_quantity}</td>
                <td>$ ${products[i].price}</td>
            </tr>`);
    }
}

const renderLowProducts = function (products) {
    $(".tableBlock").empty();
    $(".tableBlock").append(
        `<table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Amount in Stock</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody class="productTableM">
            </tbody>
        </table>`);
    for (let i = 0; i < products.length; i++) {
        if (products[i].stock_quantity < 5) {
            $(".productTableM").append(
                `<tr>
                    <td>${products[i].id}</td>
                    <td>${products[i].product_name}</td>
                    <td>${products[i].stock_quantity}</td>
                    <td>$ ${products[i].price}</td>
                </tr>`);
        }
    }
}

const renderAddInven = function (products) {
    $(".tableBlock").empty();
    $(".tableBlock").append(
        `<table class="table">
            <thead>
                <tr>
                    <th scope="col">Qty
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Amount in Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Add</th>
                </tr>
            </thead>
            <tbody class="productTableM">
            </tbody>
        </table>`);
    for (let i = 0; i < products.length; i++) {
        $(".productTableM").append(
            `<tr>
                <td><input type="number" class="form-control" id="managerInput${i + 1}"></td>
                <td>${products[i].id}</td>
                <td>${products[i].product_name}</td>
                <td>${products[i].stock_quantity}</td>
                <td>$ ${products[i].price}</td>
                <td class="addToInven" data-productID=${products[i].id}>+</td>
            </tr>`);
    }
}

const addToInven = function () {
    const id = $(this).attr("data-productID");
    console.log("Test");
    if ($(`#managerInput${id}`).val() > 0 && $(`#managerInput${id}`).val() !== "") {
        $.get(`/api/products/${id}`).then(function (product) {
            $.ajax({
                url: `/api/products/${id}`,
                method: "PUT",
                data: {
                    product_name: product.product_name,
                    department_name: product.department_name,
                    price: product.price,
                    stock_quantity: product.stock_quantity
                        + parseInt($(`#managerInput${product.id}`).val())
                }
            }).then(function () {
                $(".alertBlock").empty();
                $(".alertBlock").prepend(`<div class="alert alert-success" role="alert">
                    Item has been added to inventory!</div>`);
                $(`#managerInput${product.id}`).val("");
                $.get("/api/products").then(function(products){
                    renderAddInven(products);
                });
            })
        });
    }
    else {
        $(".alertBlock").empty();
        $(".alertBlock").prepend(`<div class="alert alert-danger" role="alert">
            Please enter a number greater than zero!</div>`);
    }

}

const renderNewProduct = function () {
    $(".tableBlock").empty();
    $(".tableBlock").append(
        `<h2>Add New Product</h2>
        <form>
            <div class="form-group">
                <label for="productName">Product Name</label>
                <input type="text" class="form-control" id="productName" placeholder="Enter product name">
            </div>
            <div class="form-group">
                <label for="departmentName">Department Name</label>
                <input type="text" class="form-control" id="departmentName" placeholder="Enter department name">
            </div>
            <div class="form-group">
                <label for="stockQuantity">Quantity to Stock</label>
                <input type="number" class="form-control" id="stockQuantity" placeholder="Enter quantity">
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" class="form-control" id="price" placeholder="Enter price">
            </div>
            <button type="button" class="btn btn-primary" id="addBtn">Add</button>
        </form>`);
}

const addNewProduct = function (event) {
    event.preventDefault();
    if ($("#productName").val() === "" || $("#departmentName").val() === "" || $("#stockQuantity").val() === "" || $("#price").val() === "") {
        $(".alertBlock").empty();
        $(".alertBlock").prepend(`<div class="alert alert-danger" role="alert">
            Please complete all input fields!</div>`);
    }
    else {
        $.post("/api/products", {
            product_name: $("#productName").val(),
            department_name: $("#departmentName").val(),
            stock_quantity: $("#stockQuantity").val(),
            price: $("#price").val()
        }).then(function () {
            $(".alertBlock").empty();
            $(".alertBlock").prepend(`<div class="alert alert-success" role="alert">
                Item has been added to inventory!</div>`);
            $("#productName").val("");
            $("#departmentName").val("");
            $("#stockQuantity").val("");
            $("#price").val("");
        });
    }

}

getAllProducts();
$("#myCart").on("click", renderCart);
$(".table").on("click", ".addToCart", addToCart);
$(".products").on("click", ".addToInven", addToInven);
$(".table").on("click", "#productID", removeFromCart);
$("#checkOut").on("click", checkOut);
$(".getProducts").on('click', getProductsM);
$(".products").on('click', "#addBtn", addNewProduct);