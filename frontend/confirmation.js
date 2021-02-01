
// récupération des données de l'url

const queryID = window.location.search;
let idOrder = new URLSearchParams(queryID).get("id");
let prixTotal = new URLSearchParams(queryID).get("total");
let contactSting = new URLSearchParams(queryID).get("contact")
let contact = JSON.parse(contactSting)

// récupération des éléments html

let nom = document.getElementById ("nom")
let prenom = document.getElementById ("prénom")
let ville = document.getElementById ("ville")
let adresse = document.getElementById ("adresse")
let email = document.getElementById ("email")
let idCommande = document.getElementById ("idCommande")
let boxPrixTotal = document.getElementById("prixTotal")

// injection du contenu dans les éléments

idCommande.innerHTML = idOrder
boxPrixTotal.innerHTML =  prixTotal
nom.innerHTML = contact.lastName
prenom.innerHTML = contact.firstName
ville.innerHTML = contact.city
adresse.innerHTML = contact.address
email.innerHTML = contact.email

  
