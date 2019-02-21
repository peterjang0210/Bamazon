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
        if ($("#customerInput").val() > product.stock_quantity) {
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
    console.log(this);
    console.log(this.id);
    const id = this.id;
    $.get("/api/products").then(function (products) {
        if(id === "viewProducts"){
            renderAllProducts(products);
        }
        else if(id === "viewLowInven"){
            renderLowProducts(products);
        }
    });

}

const renderAllProducts = function (products) {
    $(".products").empty();
    $(".products").append(
        `<table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Department</th>
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
                <td>${products[i].department_name}</td>
                <td>${products[i].stock_quantity}</td>
                <td>$ ${products[i].price}</td>
            </tr>`);
    }
}

const renderLowProducts = function (products) {
    $(".products").empty();
    $(".products").append(
        `<table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Department</th>
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
                    <td>${products[i].department_name}</td>
                    <td>${products[i].stock_quantity}</td>
                    <td>$ ${products[i].price}</td>
                </tr>`);
        }
    }
}

getAllProducts();
$("#myCart").on("click", renderCart);
$(".table").on("click", ".addToCart", addToCart);
$(".table").on("click", "#productID", removeFromCart);
$("#checkOut").on("click", checkOut);
$(".getProducts").on('click', getProductsM);