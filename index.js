//==== outil dev :  rendu du back ====//

// var request= new XMLHttpRequest();
// request.onreadystatechange = function (){
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         console.log(JSON.parse(this.responseText));
//     }
// }
// request.open ("GET", "http://localhost:3000/api/teddies");
// request.send();  

// ==== I.Afficher les éléments de manière dynamique ====//

// ==== I.1) Carousel dynamique ====//

var imgURL = new XMLHttpRequest();
imgURL.onreadystatechange = function (){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
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
}
imgURL.open ("GET", "http://localhost:3000/api/teddies");
imgURL.send();  

// ==== I.2) Card dynamique ====//

var cardGenerator = new XMLHttpRequest();
cardGenerator.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
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

            //création block a//

            var stretchedLink = document.createElement("a");
            stretchedLink.classList.add("stretched-link");
            var regex = / /g;
            stretchedLink.href = response[i].name.replace(regex,"-")+".html";
            cardBody.appendChild(stretchedLink);

            //création block h3//

            var cardTitle = document.createElement("h3");
            cardTitle.classList.add("card-title");
            cardTitle.innerHTML = response[i].name;
            stretchedLink.appendChild(cardTitle);

            //création bloc span//

            var price = document.createElement("span");
            price.classList.add("bg-primary","text-light","p-1");
            var numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response[i].price)/100)
            price.innerHTML = numberFormated;
            stretchedLink.appendChild(price);

            //création block cardText//
            var cardText = document.createElement("div");
            cardText.classList.add("card-text");
            cardText.innerHTML = response[i].description;
            cardBody.appendChild(cardText);

        }
    }
}
cardGenerator.open ("GET", "http://localhost:3000/api/teddies");
cardGenerator.send(); 

// ==== Envoyer des données au localStorage ====//

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
    //utilisé les données du localStorage pour afficher un message de réussite personalisé"//
    var contactStorage = localStorage.getItem("contact");
    var contactStorageJSON = JSON.parse(contactStorage);
    var firstNameSaved = document.getElementById("firstNameSaved");
    firstNameSaved.innerHTML = contactStorageJSON.firstName;
});