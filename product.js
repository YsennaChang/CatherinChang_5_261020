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

// =========== Enregistrement du contact =========== //

// I. 1) comportement par défaut le localStorage est vide, afficher le formulaire contact, mettre en invisible le bloc info et bouton modifier//

var form = document.getElementById("contact-form"); // visible (par défaut)
var registeredInfos = document.getElementById("registered-infos"); // invisible (par défaut)
var btnModify = document.getElementById("btn-modify"); // invisible (par défaut)


//  Envoyer des données au localStorage //
var contactSubmited = document.getElementById("contact-submited");
contactSubmited.addEventListener("click", (event) => {
    event.preventDefault();
    var contact = {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value
    }

    localStorage.setItem("contact",JSON.stringify(contact));
    // Afficher un message de réussite personalisé"//
    
    $(".alert").show();

    //Insère les nouvelles informations du contact dans le bloc contact
    replaceBlockRegisteredInfos();
    // Formulaire contact invisible//
    form.classList.toggle("is-not-visible");
    // Block info et bouton "modifier" invisible//
    registeredInfos.classList.toggle("is-not-visible");
    btnModify.classList.toggle("is-not-visible");
});


// I. 2) L'objet contact existe déjà dans le localStorage au chargement de la page, affiche directement le bloc infos et le bouton "modifier" sans le formulaire de renseignement //

function replaceBlockRegisteredInfos (){
    //relecture des données dans le localStorage//
    var contactJSON = JSON.parse(localStorage.getItem("contact"));
    //insertion dans le bloc infos//
    registeredInfos.innerHTML = contactJSON.firstName+" "+"<b>"+contactJSON.lastName.toUpperCase()+"</b>"+"<br/>"+contactJSON.address+ "<br/>" +contactJSON.city+ "<br/>"+contactJSON.email;

    //Message success, personalisation avec le prénom de l'utilisateur//
    var firstNameSaved = document.getElementById("firstNameSaved");
    firstNameSaved.innerHTML = contactJSON.firstName;
}

if (localStorage.getItem("contact")) {
    // Formulaire contact invisible//
    form.classList.toggle("is-not-visible");

    // block info et bouton "modifier" visible //
    registeredInfos.classList.toggle("is-not-visible");
    btnModify.classList.toggle("is-not-visible");

    //charger les info du localStorage et les insérer dans le bloc infos
    replaceBlockRegisteredInfos();
}

// 3. Le bouton "modifier" a été cliqué, effacer les données du block info. afficher le bloc formulaire, relecture du localStorage et insérer les nouvelles données dans le bloc info, afficher le bouton "modifier"//

btnModify.addEventListener("click", (event) => {
    event.preventDefault();
    // Formulaire de contact visible//
    form.classList.toggle("is-not-visible");
    // Block info et bouton "modifier" invisible//
    registeredInfos.classList.toggle("is-not-visible");
    btnModify.classList.toggle("is-not-visible");
});