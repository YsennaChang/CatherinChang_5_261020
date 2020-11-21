var routeAPI = "http://localhost:3000/api/teddies";
var productsInCart = JSON.parse(localStorage.getItem("products"));
var optionsInCart = JSON.parse(localStorage.getItem("options"));

var response;

async function requestAPI () {
    var myRequest = await fetch(routeAPI);
    response = await myRequest.json();

    // Remplace les éléments statiques par les informations du back
    replaceStaticByDynamicInformations ();

    // Ajoute les EventListeners "click" sur les boutons "ajouter au panier", ajoute les products_id dans le panier, met le panier dans le localStorage
    addProductInCart ();
}
requestAPI();



// ==== II. 1) Afficher les éléments page produit en dynamique ====//
function replaceStaticByDynamicInformations () {
    for (let i=0; i< response.length; i++){
        // Remplacer l'url et l'alt de l'image du Teddy//
        var photoTeddy = document.getElementsByClassName("photoTeddy")[i];
        photoTeddy.src = response[i].imageUrl;
        photoTeddy.alt = response[i].name;
        
        // Remplacer le nom du Teddy titre et h2//
        var nomTeddy = document.getElementsByClassName("nameTeddy")[i];
        nomTeddy.innerHTML = response[i].name;


        // Remplacer le prix du Teddy //
        var priceTeddy = document.getElementsByClassName("priceTeddy")[i];
        var numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response[i].price)/100)
        priceTeddy.innerHTML = numberFormated;

        // Incrémente les options //
        var colorSection = document.getElementsByClassName("colorOption")[i];
        for (let j=0; j< response[i].colors.length; j++){
            colorOption = document.createElement("option");
            colorOption.innerHTML = response[i].colors[j];
            colorSection.appendChild(colorOption);
        };

        // Remplacer la description du Teddy //
        var descriptionTeddy = document.getElementsByClassName("descriptionTeddy")[i];
        descriptionTeddy.innerHTML = response[i].description;
    }

    // Routeur : Affiche la card du produit sélectionné dans la page d'accueil
    let lastChoice = JSON.parse(localStorage.getItem("lastChoice"));
    console.log(lastChoice )
    if (lastChoice.length !== 0) { // Si la page index.html a été visité avant et qu'un ourson a été cliqué pour arriver à la page produits.html, alors

        for (let i=0; i < response.length; i++){ //Affiche uniquement le dernier choix fait sur la page index.html
            let row = document.getElementsByClassName("row")[i];
            console.log(row);
            if (i !== lastChoice) {
                row.classList.add("is-not-visible");
            }
        }
    } // Sinon, affiche (par défaut) tous les articles (cas critique où l'utilisateur arriverait directement sur la page produits.html sans passer par index.html)
}

//===== II. 2) Ajouter article au localStorage ==== //

function addProductInCart () {
    for (let i=0; i< response.length; i++){
        var btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[i];
        btnAddToCart.addEventListener("click", (event) => {
            event.preventDefault();
            // Pour chaque clic sur le bouton "Ajouter dans le panier", sauvegarder l'id du produit ...
            var productId = response[i]._id;
            
            cart.push(productId)
            localStorage.setItem("products",JSON.stringify(cart));

            // Le nombre de produit est refresh après chaque changement de quantité de produit            
            NbOfProductInCart ();
            
            var selectOption = document.getElementsByClassName("form-control")[i].value;
            let optionByDefault = "Choisissez votre couleur";
            let noOption = "Surprenez-moi !";

            if (selectOption === optionByDefault){// Remplace par noOption si pas d'option choisie
                options.push(noOption)
            } else {// Sinon, concerve l'option choisie 
               options.push(selectOption); 
            }            
            localStorage.setItem("options",JSON.stringify(options));            
        });
    }
}


//===== II. 3) Afficher nombre d'article dans le panier ==== //

if(JSON.parse(localStorage.getItem("products"))){ // Si panier non vide au chargement de la page
    var cart= productsInCart; // Reprise des éléments de cart
    NbOfProductInCart (); // Et affichage du nombre sur le panier 
} else {
    var cart=[]; // Sinon, initialisation de la variable cart et affichage du 0 sur le panier
    let numberOfProductsInCart = document.getElementById("nbProduct");
    numberOfProductsInCart.innerHTML= 0;
    
}

if(JSON.parse(localStorage.getItem("options"))){ // Si pas d'option au chargement de la page
    var options = optionsInCart; // Reprise des options du cart
} else {
    var options =[]; // initialisation de la variable option
}

function NbOfProductInCart (){
    let productsInCart = JSON.parse(localStorage.getItem("products"));
    let numberOfProductsInCart = document.getElementById("nbProduct");
    numberOfProductsInCart.innerHTML= productsInCart.length;
}

