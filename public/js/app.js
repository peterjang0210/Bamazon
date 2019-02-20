const render = function (products) {
    $("tbody").empty();
    for (let i = 0; i < products.length; i++) {
        $("tbody").append(
            `<tr>
                <td><input type="number" class="form-control" id="customerInput"></td>
                <td>${products[i].product_name}</td>
                <td>${products[i].department_name}</td>
                <td>${products[i].stock_quantity}</td>
                <td>$ ${products[i].price}</td>
                <td class="addToCart" data-productID=${products[i].id}>+</td>
            </tr>`);
    }
}

const getAllProducts = function () {
    $.get("/api/products").then(function (products) {
        console.log(products);
        render(products)
    })
}

const cart = [];
const addToCart = function () {
    const productID = $(this).attr("data-productID");
    console.log(productID)
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
                quantityOrdered: $("#customerInput").val(),
                price: product.price
            }
            cart.push(cartItem);
            $(".alertBlock").empty();
            $(".alertBlock").prepend(`<div class="alert alert-success" role="alert">
            Your item has been added to the cart!
          </div>`);
        }
    })
}

const renderCart = function () {
    $("tbody").empty();
    for (let i = 0; i < cart.length; i++) {
        $("tbody").append(
            `<tr>
                <td>${cart[i].name}</td>
                <td>${cart[i].quantityOrdered}</td>
                <td>$ ${cart[i].price}</td>
                <td>$ ${cart[i].quantityOrdered * cart[i].price}</td>
                <td class="deleteFromCart" data-cartIndex=${i}>-</td>
            </tr>`);
        if(i === cart.length - 1){
            let orderTotal = 0;
            for(let j = 0; j < cart.length; j++){
                orderTotal += (cart[j].quantityOrdered * cart[j].price);
            }
            $(".modal-body").append(`<div class="orderTotal">Price at Checkout: ${orderTotal}</div>`);
        }
    }
    $("#cartModal").modal("show");
}

getAllProducts();
$("#myCart").on("click", renderCart);
$(".table").on("click", ".addToCart", addToCart);