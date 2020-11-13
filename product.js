var routeAPI = "http://localhost:3000/api/teddies";

// ==== II. Afficher les éléments page produit en dynamique ====//

var cart=[];
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
}

//===== 2. Ajouter article au localStorage ==== //

function addProductInCart () {
    for (let i=0; i< response.length; i++){
        var btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[i];
        btnAddToCart.addEventListener("click", (event) => {
            event.preventDefault();
            var productId = response[i]._id;
            cart.push(productId);
            addCartInLocalStorage ();
            refreshNbOfProductInCart ();
        });
    }
}

function addCartInLocalStorage () {
    localStorage.setItem("products",JSON.stringify(cart));
    console.log(cart);

}

//===== 3. Afficher nombre d'article dans le panier ==== //


if(JSON.parse(localStorage.getItem(products))){
   refreshNbOfProductInCart ();
}

function refreshNbOfProductInCart (){
    var numberOfProductsInCart = document.getElementById("nbProduct");
    numberOfProductsInCart.innerHTML=JSON.parse(localStorage.getItem("products")).length;
}

