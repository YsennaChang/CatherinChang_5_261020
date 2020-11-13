
var routeAPI = "http://localhost:3000/api/teddies";
var response;
var idsInAPI=[];
var indexsInCart=[];
var sum=0;

//===== 3. Afficher nombre d'article dans le panier ==== //
var productsInCart = JSON.parse(localStorage.getItem("products"));
var numberOfProductsInCart = document.getElementById("nbProduct");
numberOfProductsInCart.innerHTML= productsInCart.length;

// ==== III. Afficher les produits stockés dans le localStorage ====//

async function requestAPI () {
    var myRequest = await fetch(routeAPI);
    response = await myRequest.json();
    // III. 1) créer un tableau référence des id selon l'ordre du back//
    for (let i=0; i<response.length; i++){
        var id = response[i]._id;
        idsInAPI.push(id);
    }
    // III. 2) pour chacun des id du panier, trouver son index dans le back
    for ( let i = 0; i < productsInCart.length; i++) {
        var indexOf = idsInAPI.indexOf(productsInCart[i]);
        indexsInCart.push(indexOf)
    }

    // III. 2) créer une ligne par produit dans le back
    
    var resume = document.getElementById("resume");

    indexsInCart.forEach(function(index, number){
        //0) div card-body rattaché à resume
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body","d-flex");
        resume.appendChild(cardBody);

        //1) image miniature attachée à card-body
        var img = document.createElement("img");
        img.classList.add("float-left","shadow-sm","col-2");
        img.style.maxWidth="100px";
        img.src = response[index].imageUrl;
        cardBody.appendChild(img);

        //2) div card-text attachée à card-body
        var cardText = document.createElement("div");
        cardText.classList.add("card-text","col-9","d-flex");
        cardBody.appendChild(cardText);

        //3) h3 nom du teddy attachée à div card-text
        var teddyName = document.createElement("h4");
        teddyName.innerHTML = response[index].name;
        teddyName.classList.add("ml-3","col-8");
        cardText.appendChild(teddyName);

        //4) span quantité attaché à div card-text (à développer en v2)
        var quantity = document.createElement("span");
        quantity.innerHTML = 1;
        quantity.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(quantity);

        //5) span prix attaché à div card-text
        var price= document.createElement("span");
        price.innerHTML = formatInPrice(response[index].price);
        price.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(price);

        //6) lien pour retirer un produit attaché à card-body
        var removeProduct = document.createElement("button");
        removeProduct.classList.add("btn","btn-primary","ml-3","btn-add-to-cart","col-1", "btn-remove-product-from-cart","mx-auto");
        removeProduct.href = "#";
        removeProduct.type = "submit";
        cardBody.appendChild(removeProduct);


        // for (let i=0; i< response.length; i++){
        //     var btnRemoveProductFromCart = document.getElementsByClassName("btn-remove-product-from-cart")[i];
        //     btnRemoveProductFromCart.addEventListener("click", (event) => {
        //         event.preventDefault();
        //         var productId = response[i]._id;
        //         cart.push(productId);
        //     });
        // }
        // localStorage.products.splice(element);

        //7) icone fontawesome rattaché à removeProduct
        var iconGarbage = document.createElement("i");
        iconGarbage.classList.add("fas","fa-trash-alt");
        removeProduct.appendChild(iconGarbage);

        // III. 3) Faire le sous total HT
        // 3a) constituer la liste des prix
        sum += response[index].price;
        sumFormated = formatInPrice(sum);
        //3b) prix rattaché à subtotal
        var subtotal = document.getElementById("subtotal");
        subtotal.innerHTML = sumFormated;
    });
    
};
requestAPI();

function formatInPrice (value){
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value/100);
}

// var commandConfirmed = document.getElementById("command-confirmed");
// commandConfirmed.addEventListener("click", (event)=>{
//     event.preventDefault();

    //5a) récupérer object contact et tableau produits dans le localStorage
    
    var contactCommand = JSON.parse(localStorage.getItem("contact"));
    var productsCommand = JSON.parse(localStorage.getItem("products"));

    //5b) envoyer au serveur API
    
    var myHeader = new Headers({
        "content-Type" : "application/json"});

    var myInit = { 
        method : "POST",
        headers : myHeader,
        body : JSON.stringify({
            contact :{
                firstName : contactCommand.firstName,
                lastName : contactCommand.lastName,
                address : contactCommand.address,
                city : contactCommand.city,
                email : contactCommand.email,
            },
            products: productsCommand
        })
    };

   fetch("http://localhost:3000/api/teddies/order", myInit)
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem("data",JSON.stringify(data));
        // var products=data.products;
        // console.log(products);
        // localStorage.setItem("products2",JSON.stringify(products));
        // var orderId= data.orderId;
        // localStorage.setItem("orderId",JSON.stringify(orderId));
    })
// });

    // III. 2) affecter la fonction localStorage.removeItem à l'icone Garbage

    // III. 2,3 et 4 bis) faire un dénombrement des articles réccurents et afficher la quantité 3) rendre la quantité modifiable 4) faire un sous total par ligne

    // III. 4) Calculer la TVA et le transport
    // III. 5) Envoyer le récap de commande au serveur avec les informations contacts
