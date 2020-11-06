//==== outil dev :  rendu du back ====//

// var request= new XMLHttpRequest();
// request.onreadystatechange = function (){
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         console.log(JSON.parse(this.responseText));
//     }
// }
// request.open ("GET", "http://localhost:3000/api/teddies");
// request.send();  

// ==== II. Afficher les éléments page produit en dynamique ====//
// Récupérer le nom du Teddy selectionné //
var urlcourante = document.location.href; 
 
// Supprimons l'éventuel dernier slash de l'URL et le .html//
urlcourante = urlcourante.replace(/.html$|\/$/, "");
// remplacer les "-" par des " " pour correspondre au formatage dans le backend //
urlcourante = urlcourante.replace(/-/g, " ");
// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
var queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );

// console.log(queue_url);

var request = new XMLHttpRequest();
request.onreadystatechange = function (){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        
        var response = JSON.parse(this.responseText);

        for (let i=0; i< response.length; i++){

            if (response[i].name===queue_url){
                // console.log(i);
                // Remplacer la photo //
                var photoTeddy = document.getElementById("photoTeddy");
                photoTeddy.src = response[i].imageUrl;
                photoTeddy.alt = response[i].name;
                
                // Remplacer le nom du Teddy titre et h2//
                var nomTeddy = document.getElementById("nameTeddy");
                var title = document.getElementsByTagName("title")[0];
                nomTeddy.innerHTML = response[i].name;
                title.innerHTML = response[i].name;

                // Remplacer le prix du Teddy //
                var priceTeddy = document.getElementById("priceTeddy");
                var numberFormated = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format((response[i].price)/100)
                priceTeddy.innerHTML = numberFormated;

                // Incrémente les options //

                var colorSection = document.getElementById("colorOption");
                for (let j=0; j< response[i].colors.length; j++){
                    colorOption = document.createElement("option");
                    colorOption.innerHTML = response[i].colors[j];
                    colorSection.appendChild(colorOption);
                };

                // Remplacer la description du Teddy //
                var descriptionTeddy = document.getElementById("descriptionTeddy");
                descriptionTeddy.innerHTML = response[i].description;
            }
        }
    }
}
request.open ("GET", "http://localhost:3000/api/teddies");
request.send();

//===== Ajouter article au localStorage ==== //
var panier = [];
var ajouterPanier = document.getElementById("ajouterPanier");
ajouterPanier.addEventListener("click", (event) =>{
    event.preventDefault();
    var addProduct = new XMLHttpRequest();
    addProduct.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (let i=0; i< response.length; i++){
                if (response[i].name===queue_url){
                    var productId = response[i]._id;
                    panier.push(productId);

                }
            }
        }
    }
    addProduct.open("GET", "http://localhost:3000/api/teddies");
    addProduct.send(); 
    localStorage.setItem("products",JSON.stringify(panier));
    console.log(panier);
})


    /**
     *
     * Expects request to contain:
     * contact: {
     *   firstName: string,
     *   lastName: string,
     *   address: string,
     *   city: string,
     *   email: string
     * }
     * products: [string] <-- array of product _id
     *
     */