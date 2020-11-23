// ==== 0 . Utilitaires ==== //

// Récupérer l'objet contenant tous les objects de l'API pour ne plus avoir de latence au calcul de la somme à chaque changement dans le panier//

var routeAPI = "http://localhost:3000/api/teddies";

fetch(routeAPI)
.then(res => res.json())
.then((allProductsInAPI) => {
    localStorage.setItem("allProductsInAPI", JSON.stringify(allProductsInAPI));
});
var response = JSON.parse(localStorage.getItem("allProductsInAPI"));  

// Récupérer le panier //
var productsInCart = JSON.parse(localStorage.getItem("products"));


// générer des tableaux ordonnés selon le back dans des variables globales //

var idOfProducts =[];
var priceOfProducts =[];

for (let i = 0; i < response.length; i++){
    // Générer un tableau de id selon l'ordre dans l'API
    var _id = response[i]._id;
    idOfProducts.push(_id);
    // Générer un tableau de prix selon l'ordre dans l'API
    var price = response[i].price;
    priceOfProducts.push(price);
}

// pour chacun des id du panier, trouver son index dans le back


var indexsInCart=[];

function getAnOrderedIndexInCart() {
    
    indexsInCart=[];
    
    let productsInCart = JSON.parse(localStorage.getItem("products"));

    for ( let i = 0; i < productsInCart.length; i++) {
        var indexOf = idOfProducts.indexOf(productsInCart[i]);
        indexsInCart.push(indexOf);
    }

}

// III. 1) créer une ligne par produit dans le back

createARowByProductsInCart();

function createARowByProductsInCart () {
    
    var resume = document.getElementById("resume");

    getAnOrderedIndexInCart();

    indexsInCart.forEach(function(index, number){

        //0) div card-body rattaché à resume
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body","d-flex");
        resume.appendChild(cardBody);

        //1) image miniature attachée à card-body
        var img = document.createElement("img");
        img.classList.add("float-left","shadow-sm","col-1");
        // img.style.maxWidth="100px";
        img.src = response[index].imageUrl;
        cardBody.appendChild(img);

        //2) div card-text attachée à card-body
        var cardText = document.createElement("div");
        cardText.classList.add("card-text","col-10","d-flex");
        cardBody.appendChild(cardText);

        //3. a) h3 nom du teddy attachée à div card-text
        var teddyName = document.createElement("h4");
        teddyName.innerHTML = response[index].name;
        teddyName.classList.add("ml-3","col-4");
        cardText.appendChild(teddyName);

        //3. b) span Sa couleur attaché à div card-text
        var option = document.createElement("span");
        option.innerHTML =  JSON.parse(localStorage.getItem("options"))[number];
        option.classList.add("p-1","ml-3","col-3","text-center")
        cardText.appendChild(option);


        //4) span quantité attaché à div card-text (à développer en v2)
        var quantity = document.createElement("span");
        quantity.innerHTML = 1;
        quantity.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(quantity);

        //5) span prix attaché à div card-text
        var price= document.createElement("span");
        price.innerHTML = formatInPrice(priceOfProducts[index]);
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
    
    getAnOrderedIndexInCart();

    let sum = 0;

    // 3a) Ajouter chaque prix à la somme
    indexsInCart.forEach(function(index){
        sum += priceOfProducts[index];
    });

    sumFormated = formatInPrice(sum);

    //3b) prix rattaché à subtotal
    var subtotal = document.getElementById("subtotal");
    subtotal.innerHTML = sumFormated;

}

// III. 3) affecter la fonction localStorage.removeItem à l'icone Garbage
removeProductFromCart();
function removeProductFromCart (){

    let productsInCart = JSON.parse(localStorage.getItem("products"));
    let optionsInCart = JSON.parse(localStorage.getItem("options"));

    for (let i=0; i < productsInCart.length; i++) {
        var btnRemoveProductFromCart = document.getElementsByClassName("btn-remove-product-from-cart")[i];
        btnRemoveProductFromCart.addEventListener("click", (event) => {
            event.preventDefault();

            // Supprime l'article du localStorage
            productsInCart.splice(i,1);
            localStorage.setItem("products", JSON.stringify(productsInCart));

            //Supprime l'option de l'article du localStorage
            optionsInCart.slice(i,1);
            localStorage.setItem("options", JSON.stringify(optionsInCart));

            // Enlève l'affichage de la ligne //
            if(event.target.parentElement.classList == "card-body d-flex") {
                event.target.parentElement.remove();
            } else {
                event.target.parentElement.parentElement.remove();
            }
            NbOfProductInCart();
            calculateTotal();
        })
    }
}

function formatInPrice (value){
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value/100);
}

// III. 4) Envoyer le récap de commande au serveur avec les informations contacts
var commandConfirmed = document.getElementById("command-confirmed");
commandConfirmed.addEventListener("click", (event)=>{

    //III. 4a) récupérer object contact et tableau produits dans le localStorage
    
    let contactCommand = JSON.parse(localStorage.getItem("contact"));
    let productsInCart = JSON.parse(localStorage.getItem("products"));

    //III. 4b) formater et envoyer le contact et la commande au serveur API
    
    var myHeader = new Headers({
        "content-Type" : "application/json"
    });

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
            products: productsInCart
        })
    };
    // III. 4c) sauvegarder la réponse du back dans le localStorage
   fetch(routeAPI+"/order", myInit)
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem("data",JSON.stringify(data));
    })
});


// ======= Esthétique ======= //

// Afficher nombre d'article dans le panier //

if(JSON.parse(localStorage.getItem("products"))){ // valeur au chargement de la page //
    NbOfProductInCart ();
}

function NbOfProductInCart (){
    
    let productsInCart = JSON.parse(localStorage.getItem("products"));
    
    //Affichage du nombre de produit dans le panier sur le bouton panier
    let numberOfProductsInCart = document.getElementById("nbProduct");
    numberOfProductsInCart.innerHTML= productsInCart.length;

    // Affichage du nombre de produit dans le panier dans la ligne Total
    let qty = document.getElementById("qty");
    qty.innerHTML = productsInCart.length;

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