
// ==== I.Afficher les éléments de manière dynamique ====//

// ==== I.1) Carousel dynamique ====//
var imgURL = new XMLHttpRequest();
imgURL.onreadystatechange = function (){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        
        
        var carouselInner = document.getElementsByClassName("carousel-inner");
        carouselInner.appendChild(carouselItem);
        var carouselItem = document.getElementsByClassName("carousel-item");
        carouselItem.appendChild(imageCarousel);

        var response = JSON.parse(this.responseText);
        var imageCarousel = document.createElement("img");
        
        imageCarousel.src = response[0].imageUrl;
        imageCarousel.classList.add("d-block","w-50","my-1","mx-auto","shadow-sm","rounded");
        imageCarousel.alt = response[0].name;
        console.log(imageCarousel);
    }
}
imgURL.open ("GET", "http://localhost:3000/api/teddies");
imgURL.send();  

// ==== I.2) Card dynamique ====//




// ==== Envoyer des données au serveur et en afficher le résultat ==== //

// var result = document.getElementById("result");
// var formSubmited = document.getElementById("form");
// formSubmited.addEventListener("submit", (event) => {
//     event.preventDefault();
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
//         if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
//             var response = JSON.parse (this.responseText)
//             result.innerHTML = response.postData.text;

//         }
//     }
//     request.open("POST", "http://localhost:3000/api/teddies");
//     request.setRequestHeader("Content-Type", "application/json");
//     var propertyValue = document.getElementById("value").value;
//     request.send(JSON.stringify(propertyValue));
// });