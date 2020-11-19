var routeAPI = "http://localhost:3000/api/teddies";
var productsInCart = JSON.parse(localStorage.getItem("products"));
var optionsInCart = JSON.parse(localStorage.getItem("options"));

var response;

async function requestAPI () {
    var myRequest = await fetch(routeAPI);
    response = await myRequest.json();
    // Remplace les éléments statiques par les informations stockées dans le back
    replaceStaticByDynamicInformations ();
    // Ajoute les EventListeners "click" sur les boutons "ajouter au panier", ajoute les products_id dans le panier, met le panier dans le localStorage
    addProductInCart ();
}
requestAPI();



// ==== II. Afficher les éléments page produit en dynamique ====//
function replaceStaticByDynamicInformations () {
    for (let i=0; i< response.length; i++){
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

    // Routeur : Affiche la card du produit sélectionné dans la page d'accueil uniquement

    let lastChoice = JSON.parse(localStorage.getItem("lastChoice"));
    
    if (lastChoice) {
        for (let i=0; i < response.length; i++){
            let row = document.getElementsByClassName("row")[i];
            if (i !== lastChoice){
                row.classList.add("is-not-visible");
            }
        }
    }
}

//===== 2. Ajouter article au localStorage ==== //

function addProductInCart () {
    for (let i=0; i< response.length; i++){
        var btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[i];
        btnAddToCart.addEventListener("click", (event) => {
            event.preventDefault();

            var productId = response[i]._id;
            cart.push(productId)
            localStorage.setItem("products",JSON.stringify(cart));

            var selectOption = document.getElementsByClassName("form-control")[i].value;
            let optionByDefault = "Choisissez votre couleur";
            let noOption = "Surprenez-moi !";

            if (selectOption === optionByDefault){
                options.push(noOption)
            } else {
               options.push(selectOption); 
            }
            
            localStorage.setItem("options",JSON.stringify(options));

            NbOfProductInCart ();
        });
    }
}


//===== 3. Afficher nombre d'article dans le panier ==== //

if(JSON.parse(localStorage.getItem("products"))){ // valeur au chargement de la page //
    var cart= productsInCart; // Reprise des éléments de cart
    NbOfProductInCart ();
} else {
    var cart=[]; // initialisation de la variable cart
    
}

if(JSON.parse(localStorage.getItem("options"))){
    var options = optionsInCart; // Reprise des options du cart
} else {
    var options =[]; // initialisation de la variable option
}

function NbOfProductInCart (){
    let productsInCart = JSON.parse(localStorage.getItem("products"));
    let numberOfProductsInCart = document.getElementById("nbProduct");
    numberOfProductsInCart.innerHTML= productsInCart.length;
}

