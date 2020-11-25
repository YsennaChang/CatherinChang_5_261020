
// ==== II. Afficher les éléments de manière dynamique ====//

requestAPI();
function requestAPI () {
   get("/")
        .then(res => {
            console.log(res);
            generateCarouselImages(res);
            generateCardsInformations (res);
            addSelectInStorage(res);
        })
        .catch(err => {
            console.error('Il y a eu un problème avec l\'opération fetch: ' + APIUrl +". "+ err.message)
        })
}

// ==== II. 1) Carousel dynamique ====//

function generateCarouselImages (response){
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

// ==== II. 2) Card dynamique ====//

function generateCardsInformations (response) {
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

// ==== II. 4) Sauvegarder la selection dans le localStorage ====//

function addSelectInStorage(response){
    for (let i=0; i< response.length; i++) {
        let card = document.getElementsByClassName("card")[i];
        card.addEventListener("click", (e)=>{
            var lastChoice = response[i]._id;
            localStorage.setItem("lastChoice", JSON.stringify(lastChoice));
            console.log(lastChoice);
        })
    }
}
    
