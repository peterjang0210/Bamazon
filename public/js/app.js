const render = function(products){
    $("tbody").empty();
    for(let i = 0; i < products.length; i++){
        $("tbody").append(
            `<tr>
                <td><input type="number" class="form-control></td>
                <td>${products[i].product_name}</td>
                <td>${products[i].department_name}</td>
                <td>${products[i].stock_quantity}</td>
                <td>$ ${products[i].price}</td>
                <td>Purchase</td>
            </tr>`);
    }
}

const getAllProducts = function(){
    $.get("/api/products").then(function(products){
        console.log(products);
        render(products)
    })
}

getAllProducts();