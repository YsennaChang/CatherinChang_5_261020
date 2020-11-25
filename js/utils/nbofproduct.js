// Afficher nombre d'article dans le panier //
var numberOfProductsInCart = document.getElementById("nbProduct");
var qty = document.getElementById("qty");

if(JSON.parse(localStorage.getItem("cart"))){ // Si panier non vide au chargement de la page
    var cart= JSON.parse(localStorage.getItem("cart")); // Reprise des éléments de cart
    NbOfProductInCart (); // Et affichage du nombre sur le panier 
    console.log(cart);
} else {
    var cart=[]; // Sinon, initialisation de la variable cart et affichage du 0 sur le panier
    numberOfProductsInCart.innerHTML= 0;
}

function NbOfProductInCart (){
    numberOfProductsInCart.innerHTML= cart.length;
    qty.innerHTML = cart.length;
}