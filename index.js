var routeAPI = "http://localhost:3000/api/teddies";


//==== outil dev :  rendu du back ====//           
// async function renduDuBack(){
//     var testAPI = await fetch(routeAPI);
//     if (testAPI.ok){
//         test = await testAPI.json()
//         console.log(test); 
//     } else {
//         console.error (" Retour serveur : ", testAPI.status);
//     }
// }
// renduDuBack();

// =========== I. L'objet "contact" =========== //
// Gestion des différents éléments en lien avec l'objet contact//
// 1. comportement par défaut le localStorage est vide, afficher le formulaire contact, mettre en invisible le bloc info et bouton modifier//

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
    
    // document.getElementById("msgSuccess").classList.toggle("is-not-visible");

    //Insère les nouvelles informations du contact dans le bloc contact
    replaceBlockRegisteredInfos();
    // Formulaire contact invisible//
    form.classList.toggle("is-not-visible");
    // Block info et bouton "modifier" invisible//
    registeredInfos.classList.toggle("is-not-visible");
    btnModify.classList.toggle("is-not-visible");
});


// 2. L'objet contact existe déjà dans le localStorage au chargement de la page, affiche directement le bloc infos et le bouton "modifier" sans le formulaire de renseignement //

function replaceBlockRegisteredInfos (){
    //relecture des données dans le localStorage//
    var contactJSON = JSON.parse(localStorage.getItem("contact"));
    //insertion dans le bloc infos//
    registeredInfos.innerHTML = 
    contactJSON.firstName+" "+"<b>"+contactJSON.lastName.toUpperCase()+"</b>"+"<br/>"
    +contactJSON.address+ "<br/>"
    +contactJSON.city+ "<br/>"
    +contactJSON.email;

    //Message success, personalisation avec le prénom de l'utilisateur//
    var firstNameSaved = document.getElementById("firstNameSaved");
    firstNameSaved.innerHTML = contactJSON.firstName;
}

if (localStorage.getItem("contact").length>0) {
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






// ==== II.Afficher les éléments de manière dynamique ====//
async function requestAPI () {
    var responseAPI = await fetch(routeAPI);
    if (responseAPI.ok) {
            response = await responseAPI.json();
    generateCarouselImages();
    generateCardsInformations ();
    } else {
        console.error (" Retour serveur : ", responseAPI.status);
    }

}
requestAPI();

// ==== I.1) Carousel dynamique ====//

function generateCarouselImages (){
    var carouselInner = document.getElementsByClassName("carousel-inner")[0];
    for (let i = 0; i < response.length; i++) {
        var carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i==0) {
            carouselItem.classList.add("active");
        }
        carouselInner.appendChild(carouselItem);
        var carouselItem = document.getElementsByClassName("carousel-item")[i];
        var imageCarousel = document.createElement("img");
        carouselItem.appendChild(imageCarousel);            
        imageCarousel.src = response[i].imageUrl;
        imageCarousel.classList.add("d-block","w-50","my-1","mx-auto","shadow-sm","rounded");
        imageCarousel.alt = response[i].name;
    }
}

// ==== I.2) Card dynamique ====//

function generateCardsInformations () {
    // pointage id teddiescard //
    var teddiesCards = document.getElementById ("teddiesCard");

    // boucle de génération des infos des cards //
    for (let i = 0; i < response.length; i++) {
    //création block section card //
    var card = document.createElement("section");
    card.classList.add("col-12","col-md-6","col-lg-3","card");
    teddiesCards.appendChild(card);

    // création block image//
    var cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top", "shadow-sm");
    cardImage.src = response[i].imageUrl;
    cardImage.alt = response[i].name;
    card.appendChild(cardImage);

    // création block cardBody//
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    //création block lien vers la page produit//

    var stretchedLink = document.createElement("a");
    stretchedLink.classList.add("stretched-link");
    var regex = / /g;
    stretchedLink.href = "products.html";
    // stretchedLink.href = response[i].name.replace(regex,"-")+".html";
    cardBody.appendChild(stretchedLink);

    //création block Nom du Teddy//

    var cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = response[i].name;
    stretchedLink.appendChild(cardTitle);

    //création bloc prix//

    var price = document.createElement("span");
    price.classList.add("bg-primary","text-light","p-1");
    var numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response[i].price)/100)
    price.innerHTML = numberFormated;
    stretchedLink.appendChild(price);

    //création block description//
    var cardText = document.createElement("div");
    cardText.classList.add("card-text");
    cardText.innerHTML = response[i].description;
    cardBody.appendChild(cardText);
    }
}





    
