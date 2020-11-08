/** Infos à envoyer au backend
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

//==== outil dev :  rendu du back ====//

// var request= new XMLHttpRequest();
// request.onreadystatechange = function (){
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         console.log(JSON.parse(this.responseText));
//     }
// }
// request.open ("GET", "http://localhost:3000/api/teddies");
// request.send();  

// ==== II. Afficher les éléments page produit en dynamique ====//


var cart = [];


var routeAPI = "http://localhost:3000/api/teddies";
var response;
function requestAPI () {
    var myRequest = new XMLHttpRequest ();
    myRequest.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status ==200){
            response = JSON.parse(this.responseText);
            replaceStaticByDynamicInformations ();
            // ajoute les EventListeners "click" sur les boutons "ajouter au panier", ajoute les products_id dans le panier, met le panier dans le localStorage
            addProductInCart ();
        }
    }
    myRequest.open("GET", routeAPI);
    myRequest.send();
}
requestAPI();


function replaceStaticByDynamicInformations () {
    for (let i=0; i< response.length; i++){
        var photoTeddy = document.getElementsByClassName("photoTeddy")[i];
        photoTeddy.src = response[i].imageUrl;
        photoTeddy.alt = response[i].name;
        
        // Remplacer le nom du Teddy titre et h2//
        var nomTeddy = document.getElementsByClassName("nameTeddy")[i];
        // var title = document.getElementsByTagName("title")[0];
        nomTeddy.innerHTML = response[i].name;
        // title.innerHTML = response[i].name;

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

//===== Ajouter article au localStorage ==== //
function addProductInCart () {
    for (let i=0; i< response.length; i++){
        var btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[i];
        btnAddToCart.addEventListener("click", (event) =>{
            event.preventDefault();
            var productId = response[i]._id;
            cart.push(productId);
            addCartInLocalStorage ();
        });
    }
}

function addCartInLocalStorage () {
    localStorage.setItem("products",JSON.stringify(cart));
    console.log(cart);

}