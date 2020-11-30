// =========== Page Confirmation de commande =========== //
// Remplir la page de remerciement par les informations renvoyées par l'API

console.log("Confirmation says Hello !")

const data = JSON.parse(localStorage.getItem("data"));
console.log(data);

// Numéro de commande
const orderId = document.getElementById("order-id");
orderId.innerHTML = data.orderId;

// Nom et Prénom Client
const nomPrénom = document.getElementById("nom-prénom");
nomPrénom.innerHTML = data.contact.firstName+" "+data.contact.lastName;

// Adresse Client
const address = document.getElementById("address");
address.innerHTML = data.contact.address;

// Ville Client
const city = document.getElementById("city");
city.innerHTML = data.contact.city;

// Total TTC commande
const formatInPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price/100);
}

const calculateTotal = () => {

    let sum = 0;

    // Ajouter chaque prix à la somme
    for (i=0; i<data.products.length; i++){
        sum += data.products[i].price;
    }

    // prix rattaché au total commande
    const total = document.getElementById("total")
    total.innerHTML= formatInPrice(sum);

}
calculateTotal();


// Récap des produits commandés
const productsCommanded = document.getElementById("products-commanded");

for (let i=0; i < data.products.length ; i++) {
    const nameProduct = document.createElement("div");
    nameProduct.innerHTML = "- "+ data.products[i].name;
    productsCommanded.appendChild(nameProduct);
};

