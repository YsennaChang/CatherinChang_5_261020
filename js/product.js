const lastChoice = JSON.parse(localStorage.getItem("lastChoice"));

requestAPI();
function requestAPI () {
    get("/" + lastChoice)
        .then(res => {
            console.log(res)
            // Remplace les éléments statiques par les informations du back
            replaceStaticByDynamicInformations (res);

            // Ajoute les EventListeners "click" sur les boutons "ajouter au panier", ajoute les products_id dans le panier, met le panier dans le localStorage
            addProductInCart (res);
        })
        .catch(err => {
            console.error('Il y a eu un problème avec l\'opération fetch: ' + APIUrl +". "+ err.message)
        })
}

// ==== II. 1) Afficher les éléments page produit en dynamique ====//
function replaceStaticByDynamicInformations (response) {

    // Remplacer l'url et l'alt de l'image du Teddy//
    var photoTeddy = document.getElementsByClassName("photoTeddy")[0];
    photoTeddy.src = response.imageUrl;
    photoTeddy.alt = response.name;
    
    // Remplacer le nom du Teddy titre et h2//
    var nomTeddy = document.getElementsByClassName("nameTeddy")[0];
    nomTeddy.innerHTML = response.name;


    // Remplacer le prix du Teddy //
    var priceTeddy = document.getElementsByClassName("priceTeddy")[0];
    var numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response.price)/100)
    priceTeddy.innerHTML = numberFormated;

    // Incrémente les options //
    var colorSection = document.getElementsByClassName("colorOption")[0];
    for (let i=0; i < response.colors.length; i++){
        colorOption = document.createElement("option");
        colorOption.innerHTML = response.colors[i];
        colorSection.appendChild(colorOption);
    };

    // Remplacer la description du Teddy //
    var descriptionTeddy = document.getElementsByClassName("descriptionTeddy")[0];
    descriptionTeddy.innerHTML = response.description;
}

//===== II. 2) Ajouter article au localStorage ==== //

function addProductInCart (response) {

    var btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[0];
    btnAddToCart.addEventListener("click", (event) => {
        event.preventDefault();
        // Pour chaque clic sur le bouton "Ajouter dans le panier", sauvegarder le produit ...
        
        const selectedOption = document.getElementsByClassName("form-control")[0].value;
        const optionByDefault = "Choisissez votre couleur";
        const noOption = "Surprenez-moi !";
        let optionToSend;

        if (selectedOption === optionByDefault){// Remplace par noOption si pas d'option choisie
            optionToSend = noOption ;
        } else {// Sinon, conserve l'option choisie 
            optionToSend = selectedOption; 
        }
        
        let infoToPush = {...response, option : optionToSend}; // Destructuration objet ES6
        cart.push(infoToPush);
        console.log(cart);

        localStorage.setItem("cart",JSON.stringify(cart));

        // Le nombre de produit est refresh après chaque changement de quantité de produit            
        NbOfProductInCart ();      
    });
}