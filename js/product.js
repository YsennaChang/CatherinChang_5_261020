// =========== Page Produits =========== //
// 1) Afficher le produit choisi en dynamique
// 2) Ajouter l'article et son option au localStorage

console.log("Products says Hello !")

const lastChoice = JSON.parse(localStorage.getItem("lastChoice"));
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

// ====> 1) Afficher le produit choisi en dynamique ====//

const replaceStaticByDynamicInformations = (response) => {

    // Remplacer l'url et l'alt de l'image du Teddy//
    const photoTeddy = document.getElementsByClassName("photoTeddy")[0];
    photoTeddy.src = response.imageUrl;
    photoTeddy.alt = response.name;
    
    // Remplacer le nom du Teddy titre et h2//
    const nomTeddy = document.getElementsByClassName("nameTeddy")[0];
    nomTeddy.innerHTML = response.name;


    // Remplacer le prix du Teddy //
    const priceTeddy = document.getElementsByClassName("priceTeddy")[0];
    const numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response.price)/100)
    priceTeddy.innerHTML = numberFormated;

    // Incrémente les options //
    const colorSection = document.getElementsByClassName("colorOption")[0];
    for (let i=0; i < response.colors.length; i++){
        colorOption = document.createElement("option");
        colorOption.innerHTML = response.colors[i];
        colorSection.appendChild(colorOption);
    };

    // Remplacer la description du Teddy //
    const descriptionTeddy = document.getElementsByClassName("descriptionTeddy")[0];
    descriptionTeddy.innerHTML = response.description;
}

//=====> 2) Ajouter l'article et son option au localStorage <==== //

const addProductInCart = (response) => {

    const btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[0];
    btnAddToCart.addEventListener("click", (event) => {
        event.preventDefault();

        // Sauvegarder l'option choisie        
        const selectedOption = document.getElementsByClassName("form-control")[0].value;
        const optionByDefault = "Choisissez votre couleur";
        const noOption = "Surprenez-moi !";

        if (selectedOption === optionByDefault){// Remplace par noOption si pas d'option choisie
            var optionToSend = noOption ;
        } else {// Sinon, conserve l'option choisie 
            var optionToSend = selectedOption; 
        }
        
        let infoToPush = {...response, option : optionToSend}; // Destructuration objet ES6, récupère les infos de response et y ajoute l'option

        cart.push(infoToPush); // Insérer le produit et son option
        console.log(cart);

        localStorage.setItem("cart",JSON.stringify(cart)); // Envoi au localStorage le produit et son option

        NbOfProductInCart (); // Le nombre de produit est refresh après chaque changement de quantité de produit     
    });
}