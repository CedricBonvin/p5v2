let tabPrix = []
let x = -1
let ted = JSON.parse(localStorage.getItem("orinoco"))

for (let i in ted){
    panierVide(ted)
    displayStorage(ted[i])
    supprimer(x,ted,i )
    displayBasicPrice(ted[i],x) 
    displayNewPrice(ted, i,x) 
    order(ted)
}
// -------------------------    F U N C T I O N  ---------------------//

// AFFICHAGE BOX PANIER VIDE SI PANIER VIDE
function panierVide(teddy){
    let basket = document.getElementById("vide")
    if (teddy.length > 0 ){
        basket.style.display = "none"
    }
}

// AFFICHAGE DES ITEMS
function displayStorage (teddy) {

    x++
    
    // CREATION BOX ITEM-PANIER

    let boxItem = document.createElement ("div")
    boxItem.classList.add("boxItemPanier")
    boxItem.setAttribute("id",`article${x}`)
    recup.appendChild(boxItem)     
    //  INJECTION VALEURS DES ITEMS   

   // box image       
     let itemImg = document.createElement("img")
     itemImg.setAttribute("src",teddy.image);
     itemImg.classList.add("itemImg")
     boxItem.appendChild(itemImg)

    // box (  name + prix  )

    let itemName = document.createElement("h3")
    itemName.innerHTML = teddy.nom
    boxItem.appendChild(itemName)

    let itemPrice = document.createElement("div")
    itemPrice.innerHTML = teddy.price
    itemPrice.classList.add("itemPrice")
    itemPrice.classList.add("prix")
    itemName.appendChild(itemPrice)

    // box quantité

    let boxQuantite = document.createElement("div")
    boxQuantite.classList.add("boxQuantite")
    boxQuantite.setAttribute("name","boxQuantite")
    boxItem.appendChild(boxQuantite)

    // titre quantité

    let titreQuantite = document.createElement("span")
    titreQuantite.innerHTML = "Quantite"
    boxQuantite.appendChild(titreQuantite)

    // création de la liste déroulante

    let listeDeroulante = document.createElement("select")
    listeDeroulante.setAttribute("id",`select${x}`)

    for (let i = 1; i <= 10; i++){
        let option = document.createElement("option")
        option.innerHTML = i
        listeDeroulante.appendChild(option)
    }
    listeDeroulante.selectedIndex = (teddy.quantity - 1)
    boxQuantite.appendChild(listeDeroulante)

    // boutton supprimer
  
    let supprimer = document.createElement("button")
    supprimer.innerHTML = "Supprimer"
    supprimer.setAttribute("id",`supp${x}`)
    supprimer.classList.add("btn__supprimer")
    boxQuantite.appendChild(supprimer)
   
    // Box Prix

    let boxPrixItem = document.createElement("div")
    boxPrixItem.classList.add("boxPrixItem")
    boxItem.appendChild(boxPrixItem)

    // prix item

    let boxPrixTotalItem = document.createElement("div")
    boxPrixTotalItem.classList.add("prixTotalItem")
    boxPrixTotalItem.classList.add("prix")
    boxPrixTotalItem.setAttribute("id",`boxPrix${x}`)
    boxItem.appendChild(boxPrixTotalItem) 


}

 // AFFICHAGE DU PRIX A L'ARRIVER SUR LA PAGE
function displayBasicPrice (teddy,x){

    let boxPrixTotalItem = document.getElementById(`boxPrix${x}`)
    let boxprixTotal = document.getElementById("prixTotal")
        
    tabPrix.push(parseInt(teddy.quantity * teddy.price))

    // affichage prix

    boxPrixTotalItem.innerHTML = teddy.quantity * teddy.price / 100 + ".00 "
    recupPrixTotal = 0
    for (let i of tabPrix){
        recupPrixTotal += i
    }
    boxprixTotal.innerHTML = recupPrixTotal / 100 + ".00 €"
}

// AFFICHAGE DES PRIX APRES AVOIR CHOISI LA QUATITE
function displayNewPrice(teddy,index,x){
    
    let select = document.getElementById(`select${x}`)
    select.addEventListener("change",function(){
        let boxPrix = document.getElementById(`boxPrix${x}`)
        let boxprixTotal = document.getElementById("prixTotal")
        let prixTotal = 0
        let quantite = select.options[select.selectedIndex].value
        
        // changement de quantité dans le localstorage
        
        console.log(x)
        teddy[x -1].quantity = quantite
        localStorage.setItem("orinoco",JSON.stringify (teddy))
        

        boxPrix.innerHTML = (quantite * teddy[index].price) / 100 + ".00"
        
        tabPrix.splice( x ,1, teddy[index].price * quantite)
        
        for (let i of tabPrix){
            prixTotal += i
        }

        boxprixTotal.innerHTML = prixTotal / 100 + ".00 €" 
        prixTotal = 0
    })
}

// ENVOIE DES DONNEES AU SERVEUR
function order(basket){
    let buttonSubmit = document.getElementById("submit")

    buttonSubmit.addEventListener("click",function(e){
        e.stopImmediatePropagation()
        //e.preventDefault()
        
        let lastNameInput = document.getElementById("lastName").value
        let firstNameInput = document.getElementById("firstName").value
        let cityInput = document.getElementById("city").value
        let adressInput = document.getElementById("adresse").value
        let emailInput = document.getElementById("email").value
        let linkConfirmation = document.getElementById("linkConfirmation")
        let prixTotal = document.getElementById("prixTotal").innerHTML
        let tabProduct = []

        // tableau des iD

        for (let i in basket){
            tabProduct.push(basket[i].id)
        }

        //préparation de l'objet order pour post

        let order = {
            contact: {
                firstName: firstNameInput,
                lastName: lastNameInput,
                address: adressInput,
                city: cityInput,
                email: emailInput,
               },
            products : tabProduct
        }
        let orderParse = JSON.stringify(order.contact)

        // test du formlaire 

        fetch('http://localhost:3000/api/teddies/order', {
            method: "POST",
            body: JSON.stringify(order),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(serveur =>{
            linkConfirmation.setAttribute("href",`confirmation.html?id=${serveur.orderId}&total=${prixTotal}&contact=${orderParse}`)
        });    
    })
}

function supprimer(x,teddy,i){
    let product = document.getElementById(`supp${x}`)

    product.addEventListener("click",function(){
        let boxprixTotal = document.getElementById("prixTotal")
        let prixTotal = 0

        let article = document.getElementById(`article${x}`)
        teddy.splice(x,1)
        localStorage.setItem("orinoco",JSON.stringify(teddy))
        article.remove()
        tabPrix.splice(x,1)

        for (let i of tabPrix){
            prixTotal += i
        }
        boxprixTotal.innerHTML=prixTotal / 100 +".00 €"  
       
    })
}

   



