// =========== Page Index =========== //
// 1) Afficher le carousel en dynamique //
// 2) Afficher les cards en dynamique //
// 3) Enregistrer la selection dans le localStorage //

console.log("Index says Hello !")


get("/")
    .then(res => {
        console.log(res)
        // Génère les élements images du Carousel
        generateCarouselImages(res);
        
        // Génère les informations des cards avec les informations de l'API
        generateCardsInformations (res);

        // Sauvegarde la sélection dans le localStorage
        addSelectInStorage(res);
    })
    .catch(err => {
        console.error('Il y a eu un problème avec l\'opération fetch: ' + APIUrl +". "+ err.message)
    })


// ========> 1) Carousel dynamique <========//

const generateCarouselImages = (response) => {

    const carouselInner = document.getElementsByClassName("carousel-inner")[0];

    for (let i = 0; i < response.length; i++) {

        // div carouselItem rattaché à carouselInner
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i==0) { // Rendre active la première image
            carouselItem.classList.add("active");
        }
        carouselInner.appendChild(carouselItem);

        // img rattaché à Carouselitems
        const carouselItems = document.getElementsByClassName("carousel-item")[i];
        const imageCarousel = document.createElement("img");
        imageCarousel.src = response[i].imageUrl;
        imageCarousel.classList.add("d-block","w-50","my-1","mx-auto","shadow-sm","rounded");
        imageCarousel.alt = response[i].name;
        carouselItems.appendChild(imageCarousel);
    }
}

// ==== 2) Cards dynamiques ====//

const generateCardsInformations = (response) => {
    // pointage id teddiescard //
    const teddiesCards = document.getElementById("teddiesCard");

    // boucle de génération des infos des cards //
    for (let i = 0; i < response.length; i++) {

    //création block section card //
    const card = document.createElement("section");
    card.classList.add("col-12","col-md-6","col-lg-3","card");
    teddiesCards.appendChild(card);

    // création block image//
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top", "shadow-sm");
    cardImage.src = response[i].imageUrl;
    cardImage.alt = response[i].name;
    card.appendChild(cardImage);

    // création block cardBody//
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    //création block lien vers la page produit//
    const stretchedLink = document.createElement("a");
    stretchedLink.classList.add("stretched-link");
    stretchedLink.href = "product.html?_id=" + response[i]._id;
    cardBody.appendChild(stretchedLink);

    //création block Nom du Teddy//
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = response[i].name;
    stretchedLink.appendChild(cardTitle);

    //création bloc prix//
    const price = document.createElement("span");
    price.classList.add("bg-primary","text-light","p-1");
   const numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response[i].price)/100)
    price.innerHTML = numberFormated;
    stretchedLink.appendChild(price);

    //création block description//
    const cardText = document.createElement("div");
    cardText.classList.add("card-text");
    cardText.innerHTML = response[i].description;
    cardBody.appendChild(cardText);
    }
}