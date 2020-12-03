const formatInPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price/100);
}

const calculateTotal = (arrayOfProducts , idToInner) => {

    let sum = 0;

    // Ajouter chaque prix à la somme
    arrayOfProducts.forEach(product => sum += product.price);

    sumFormated = formatInPrice(sum);

    // prix rattaché à subtotal
    const subtotal = document.getElementById(idToInner);
    subtotal.innerHTML = sumFormated;

}
calculateTotal();