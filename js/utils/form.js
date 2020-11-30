// =========== Formulaire Contact =========== //
// 1) Validation des données avant envoi //
// 2) Gestion des données Contact //

console.log("Form says Hello !")

// ===============> 1) Validations des données <=============== //

// #### Définition des expressions régulières par champ #### //
let regex = {
    lastName : /[A-z]{1,}/, // au moins une lettre 
    firstName : /[A-z]{1,}/, // au moins une lettre 
    address : /[A-z]{1,}/, // au moins une lettre 
    city : /[A-z]{1,}/, // au moins une lettre 
    email :/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g // doit commencer par un mot alphanumérique ou underscore ("-" et "." autorisés), suivit de "@", puis d'un mot ("-" et "." autorisés) et finir par un mot de 2 à 4 caractères ("-" autorisés)
};

// #### Comparer les résultats saisies et les expressions régulières avant l'autorisation d'enregistrer #### //
const inputValidation = (idHTML, regex, title) => {

    idHTML.addEventListener("input", (event) => {

        const validation = event.target.nextElementSibling; 

        if (regex.test(event.target.value)) {
        validation.textContent = `${title} valide`;
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        validation.classList.add("text-success")
        validation.classList.remove("text-danger");
        } else {
            validation.textContent = `${title} invalide`;
            event.target.classList.add("is-invalid");
            event.target.classList.remove("is-valid");
            validation.classList.add("text-danger");
            validation.classList.remove("text-success");
        }

        
        disabledBtn();// Rend clickable le bouton "Enregistrer" uniquement lorsque tout les champs du formulaire ont été remplis et validés
    })
}

inputValidation(lastName, regex.lastName, "Nom");
inputValidation(firstName, regex.firstName, "Prénom");
inputValidation(address, regex.address, "Adresse");
inputValidation(city, regex.city, "Ville");
inputValidation(email, regex.email, "Email");

// #### Afficher des messages de succès ou d'erreur en fonction des données saisies #### //
const result = document.getElementsByClassName("result");

const disabledBtn = () => {

    let counter = 0;

    for (let i = 0; i< result.length ; i++ ) {

        const value = result[i].classList.value
        
        if ( value == ("result text-success")){ //compte le nombre de champ validé
            counter += 1;

            if( counter === result.length){ // rend clickable le bouton si le compteur est égale au nombre de champ existant. Tous les champs sont obligatoires.
                contactSubmited.disabled = false ;
            } 
        }
        else { // Tant qu'il reste des champs invalides, le bouton n'est pas clickable
        contactSubmited.disabled = true;
        }
    }
}

// ==========> 2) Gestion des données Contact <========== //



// #### Définition des variables globales #### //

const form = document.getElementById("contact-form"); // visible (par défaut)
const registeredInfos = document.getElementById("registered-infos"); // invisible (par défaut)
const btnModify = document.getElementById("btn-modify"); // invisible (par défaut)
const infoSaved = document.getElementById("infoSaved")

// #### Définition des fonctions globales #### //

const replaceBlockRegisteredInfos = () => { // Récupère les infos client du localStorage et les affiche dans un block à la place du formulaire
    
    const contactJSON = JSON.parse(localStorage.getItem("contact"));//relecture des données dans le localStorage
    
    registeredInfos.innerHTML += "<br/>"+ contactJSON.firstName+" "+"<b>"+contactJSON.lastName.toUpperCase()+"</b>"+"<br/>"+contactJSON.address+ "<br/>" +contactJSON.city+ "<br/>"+contactJSON.email; // Insertion dans le bloc infos
    
    const firstNameSaved = document.getElementById("firstNameSaved");
    firstNameSaved.innerHTML = contactJSON.firstName; //Message success, personalisation avec le prénom de l'utilisateur
}

const toggleVisibilityBlock = () => { //switch la visibilité de 2 éléments qui doivent switch d'état au même moment.
    form.classList.toggle("is-not-visible");
    infoSaved.classList.toggle("is-not-visible");
}


// #### Cas 0 (pas de donnée initiale dans le localStorage): Au clic du bouton "Enregistrer", envoie les données au localStorage et affiche un message de succès#### //

$(".alert").hide(); // cache le message de réussite d'enregistrement par défaut

const contactSubmited = document.getElementById("contact-submited");
contactSubmited.addEventListener("click", (event) => {
    event.preventDefault();

    const contact = {
        firstName : firstName.value,
        lastName : lastName.value,
        address: address.value,
        city : city.value,
        email : email.value
    }

    localStorage.setItem("contact",JSON.stringify(contact));
    
    $(".alert").show(); // Afficher un message de réussite personalisé

    // Insère les nouvelles informations du contact dans le bloc contact
    replaceBlockRegisteredInfos(); 

    // Formulaire invisible, block info visibles
    toggleVisibilityBlock();

})

// #### Cas 1: L'objet contact existe déjà dans le localStorage au chargement de la page, affiche directement le bloc infos et le bouton "modifier" sans le formulaire de renseignement #### //

if (localStorage.getItem("contact")) {
    
    // Formulaire invisible, block info visibles
    toggleVisibilityBlock();
    //charger les info du localStorage et les insérer dans le bloc infos
    replaceBlockRegisteredInfos(); 
}

// #### Cas 2: Le bouton "modifier" a été cliqué, effacer les données du block info. afficher le bloc formulaire, relecture du localStorage et insérer les nouvelles données dans le bloc info, afficher le bouton "modifier" #### //

btnModify.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Formulaire visible, block info invisibles
    toggleVisibilityBlock();
});