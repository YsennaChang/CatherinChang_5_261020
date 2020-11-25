// Récupérer le panier //
var cart = JSON.parse(localStorage.getItem("cart"));

// III. 1) créer une ligne par produit dans le back

createARowByProductsInCart();

function createARowByProductsInCart () {
    
    var resume = document.getElementById("resume");

    cart.forEach( product => {

        //0) div card-body rattaché à resume
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body","d-flex");
        resume.appendChild(cardBody);

        //1) image miniature attachée à card-body
        var img = document.createElement("img");
        img.classList.add("float-left","shadow-sm","col-1");
        // img.style.maxWidth="100px";
        img.src = product.imageUrl;
        cardBody.appendChild(img);

        //2) div card-text attachée à card-body
        var cardText = document.createElement("div");
        cardText.classList.add("card-text","col-10","d-flex");
        cardBody.appendChild(cardText);

        //3. a) h3 nom du teddy attachée à div card-text
        var teddyName = document.createElement("h4");
        teddyName.innerHTML = product.name;
        teddyName.classList.add("ml-3","col-4");
        cardText.appendChild(teddyName);

        //3. b) span Sa couleur attaché à div card-text
        var option = document.createElement("span");
        option.innerHTML =  product.option;
        option.classList.add("p-1","ml-3","col-3","text-center")
        cardText.appendChild(option);


        //4) span quantité attaché à div card-text (à développer en v2)
        var quantity = document.createElement("span");
        quantity.innerHTML = 1;
        quantity.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(quantity);

        //5) span prix attaché à div card-text
        var price= document.createElement("span");
        price.innerHTML = formatInPrice(product.price);
        price.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(price);

        //6) bouton pour enlever un produit attaché à card-body
        var removeProduct = document.createElement("button");
        removeProduct.classList.add("btn","btn-primary","ml-3","btn-add-to-cart","col-1", "btn-remove-product-from-cart","mx-auto");
        removeProduct.href = "#";
        removeProduct.type = "submit";
        cardBody.appendChild(removeProduct);

        //7) icone fontawesome rattaché à removeProduct
        var iconGarbage = document.createElement("i");
        iconGarbage.classList.add("fas","fa-trash-alt");
        removeProduct.appendChild(iconGarbage);

    });
}
// III. 2) Calcul de la somme des articles dans le panier

// III. 2b) Calculer le total TTC //

calculateTotal();

function calculateTotal(){

    let sum = 0;

    // 3a) Ajouter chaque prix à la somme
    cart.forEach(product => {
        sum += product.price;
    });

    sumFormated = formatInPrice(sum);

    //3b) prix rattaché à subtotal
    var subtotal = document.getElementById("subtotal");
    subtotal.innerHTML = sumFormated;

}

function formatInPrice (value){
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value/100);
}

// III. 3) affecter la fonction localStorage.removeItem à l'icone Garbage
removeProductFromCart();
function removeProductFromCart (){

    for (let i=0; i < cart.length; i++) {
        var btnRemoveProductFromCart = document.getElementsByClassName("btn-remove-product-from-cart")[i];
        btnRemoveProductFromCart.addEventListener("click", (event) => {
            event.preventDefault();

            // Supprime l'article du localStorage
            cart.splice(i,1);
            localStorage.setItem("cart", JSON.stringify(cart));

            // Enlève l'affichage de la ligne //
            if(event.target.parentElement.classList == "card-body d-flex") {
                event.target.parentElement.remove();
            } else {
                event.target.parentElement.parentElement.remove();
            }

            // Refresh nombre de produit et total //
            NbOfProductInCart();
            calculateTotal();
        })
    }
}



// III. 4) Envoyer le récap de commande au serveur avec les informations contacts

var commandConfirmed = document.getElementById("command-confirmed");
commandConfirmed.addEventListener("click", (e)=>{
    e.preventDefault();
    //III. 4a) récupérer object contact et tableau produits dans le localStorage
    // Check de la bonne saisie des données
    let contact = JSON.parse(localStorage.getItem("contact"));
    let products = [];
    cart.forEach(product => {
        products.push(product._id);
    })

    //III. 4b) formater et envoyer le contact et la commande au serveur API
    
    let body = JSON.stringify({contact,  products})

    // III. 4c) sauvegarder la réponse du back dans le localStorage
    post("/order", body)
        .then(data => {
            localStorage.setItem("data", JSON.stringify(data));
            window.location = "commanded.html"
        })    
});