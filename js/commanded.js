var data = JSON.parse(localStorage.getItem("data"));


var orderId = document.getElementById("order-id");
orderId.innerHTML = data.orderId;

var nomPrénom = document.getElementById("nom-prénom");
nomPrénom.innerHTML = data.contact.firstName+" "+data.contact.lastName;

var address = document.getElementById("address");
address.innerHTML = data.contact.address;

var city = document.getElementById("city");
city.innerHTML = data.contact.city;

var productsCommanded = document.getElementById("products-commanded");
for(let i=0; i< data.products.length; i++) {
    var nameProduct = document.createElement("div");
    nameProduct.innerHTML = "- "+data.products[i].name;
    productsCommanded.appendChild(nameProduct);
};