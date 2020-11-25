// =========== Enregistrement du contact =========== //
$(".alert").hide();
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


