// =========== Page Panier =========== //
// 1) Créer une ligne par produit dans le Panier //
// 2) Calcul de la somme des articles dans le panier //
// 3) Rendre Fonctionnel l'icone poubelle //
// 4) Envoyer le récap de commande et les informations contacts et récupérer le numéro de commande //

console.log("Cart says Hello !")

const formatInPrice = (value) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value/100);
}


// ====> 1) Créer une ligne par produit dans le Panier <==== //

const createARowByProductsInCart = () => {
    
    const resume = document.getElementById("resume");

    cart.forEach( product => {

        // div card-body rattaché à resume
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body","d-flex");
        resume.appendChild(cardBody);

        // image miniature attachée à card-body
        const img = document.createElement("img");
        img.classList.add("float-left","shadow-sm","col-1");
        // img.style.maxWidth="100px";
        img.src = product.imageUrl;
        cardBody.appendChild(img);

        // div card-text attachée à card-body
        const cardText = document.createElement("div");
        cardText.classList.add("card-text","col-10","d-flex");
        cardBody.appendChild(cardText);

        // h3 nom du teddy attachée à div card-text
        const teddyName = document.createElement("h4");
        teddyName.innerHTML = product.name;
        teddyName.classList.add("ml-3","col-4");
        cardText.appendChild(teddyName);

        // span Sa couleur attaché à div card-text
        const option = document.createElement("span");
        option.innerHTML =  product.option;
        option.classList.add("p-1","ml-3","col-3","text-center")
        cardText.appendChild(option);


        // span quantité attaché à div card-text
        const quantity = document.createElement("span");
        quantity.innerHTML = 1;
        quantity.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(quantity);

        // span prix attaché à div card-text
        const price= document.createElement("span");
        price.innerHTML = formatInPrice(product.price);
        price.classList.add("p-1","ml-3","col-2","text-center");
        cardText.appendChild(price);

        // bouton pour enlever un produit attaché à card-body
        const removeProduct = document.createElement("button");
        removeProduct.classList.add("btn","btn-primary","ml-3","btn-add-to-cart","col-1", "btn-remove-product-from-cart","mx-auto");
        removeProduct.href = "#";
        removeProduct.type = "submit";
        cardBody.appendChild(removeProduct);

        // icone fontawesome rattaché à removeProduct
        const iconGarbage = document.createElement("i");
        iconGarbage.classList.add("fas","fa-trash-alt");
        removeProduct.appendChild(iconGarbage);

    });
}
createARowByProductsInCart();

// ====> 2) Calcul de la somme des articles dans le panier <==== //

const calculateTotal = () => {

    let sum = 0;

    // Ajouter chaque prix à la somme
    cart.forEach(product => sum += product.price);

    sumFormated = formatInPrice(sum);

    // prix rattaché à subtotal
    let subtotal = document.getElementById("subtotal");
    subtotal.innerHTML = sumFormated;

}
calculateTotal();

// ====> 3) Rendre fonctionnel le bouton poubelle <====//

const removeProductFromCart = () => {

    for (let i=0; i < cart.length; i++) {
        const btnRemoveProductFromCart = document.getElementsByClassName("btn-remove-product-from-cart")[i];
        btnRemoveProductFromCart.addEventListener("click", (event) => {
            event.preventDefault();

            // Supprime l'article du localStorage
            cart.splice(i,1);
            localStorage.setItem("cart", JSON.stringify(cart));

            // Enlève l'affichage de la ligne //
            if(event.target.parentElement.classList == "card-body d-flex") {
                event.target.parentElement.remove();
            } else {
                event.target.parentElement.parentElement.remove();
            }

            // Refresh nombre de produit et total //
            NbOfProductInCart();
            calculateTotal();
        })
    }
}
removeProductFromCart();


// ====> 4) Envoyer le récap de commande et les informations contacts et récupérer le numéro de commande <==== //

const commandConfirmed = document.getElementById("command-confirmed");
commandConfirmed.addEventListener("click", (e)=>{
    e.preventDefault();
    // récupérer object contact et tableau produits dans le localStorage

    const contact = JSON.parse(localStorage.getItem("contact"));
    let products = [];
    cart.forEach(product => {
        products.push(product._id);
    })

    // formater et envoyer le contact et la commande à l'API et récupérer le numéro de commande

    if (products.length > 0 && contact) {// Vérification si le panier est non vide et que les infos clients sont présentes
        const body = JSON.stringify({contact,  products});
        post("/order", body)
            .then(data => {
                console.log(data);
                localStorage.setItem("data", JSON.stringify(data)); // sauvegarder la réponse du back dans le localStorage
                window.location = "commanded.html"; // Rediriger vers la page commanded.html
            })    
    } else if (products.length==0){ // Si le panier est vide
        alert ("Y'a forcément quelque chose qui vous tente?")
    } else if (!contact) { // si le contact n'est pas renseigner
        alert ("Où est ce qu'on vous envoie tout ça ? :) ")
    }
});