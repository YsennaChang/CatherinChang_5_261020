
console.log("Ajax says Hello !")

// ============> Récupérer les données de l'API <============ //

var APIUrl = "http://localhost:3000/api/teddies";
const messageError = "Vérifiez l'état de l'API: Dans votre console, placez vous dans le dossier de l'API et installez le via la commande 'npm install' puis mettre en route via 'node server'.\nVérifiez que le chemin d'accès est correcte : "

function get(parameter){
    return fetch(APIUrl+parameter) // retourne la promesse du fetch qui retourne l'objet json 
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                alert(messageError + APIUrl + parameter)
            }
            
        })
        .then(json => json)
}

// ============> Envoyer et récupérer des données de l'API <============ //

function post(parameter, dataToSend){
    const myHeader = new Headers ({
        "content-Type" : "application/json"
    });

    const myInit = { 
        method : "POST",
        headers : myHeader,
        body : dataToSend
    };

   return fetch(APIUrl+parameter , myInit) // retourne la promesse du fetch qui retourne l'objet json
    .then (res => {
        if(res.ok) {
            return res.json()
        } else {
            alert(messageError + APIUrl + parameter)
        }
    })
    .then (json => json) // return json (écriture ES6)
}
