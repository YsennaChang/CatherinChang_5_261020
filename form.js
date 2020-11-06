// ==== outil dev :  rendu du back ====//

// var request= new XMLHttpRequest();
// request.onreadystatechange = function (){
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         console.log(JSON.parse(this.responseText));
//     }
// }
// request.open ("GET", "http://localhost:3000/api/teddies");
// request.send();  


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
    var contactStorage = localStorage.getItem("contact");
    var contactStorageJSON = JSON.parse(contactStorage);
    var firstNameSaved = document.getElementById("firstNameSaved");
    firstNameSaved.innerHTML = contactStorageJSON.firstName;
});



//==== Envoyer des données au serveur et en afficher le résultat ==== //


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