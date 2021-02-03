let x = -1
let ted = JSON.parse(localStorage.getItem("orinoco"))
for (let i in ted){
    if (ted[i]){
        displayStorage(ted[i])
        displayBasicPrice(ted[i],x) 
        displayNewPrice(ted, i,x) 
        supprimer(x,ted,i)
        order(ted,i) 
        panierVide(ted,i)
    }   
}

// -------------------------    F U N C T I O N  ---------------------//

// AFFICHAGE BOX PANIER VIDE SI PANIER VIDE
function panierVide(teddy,i){
    let basket = document.getElementById("vide")
    
    if (teddy.length > 0 ){
        basket.style.display = "none"   
    }  

  
}

// AFFICHAGE DES ITEMS
function displayStorage (teddy) {
   
    // variable pour les les ID
    x++  

    // création de la box des items
    let boxItem = document.createElement ("div")
    boxItem.classList.add("boxItemPanier")
    boxItem.setAttribute("id",`article${x}`)
    recup.appendChild(boxItem) 

    // titre nom + prix de base
    let title = document.createElement("div")
    title.innerHTML = (`${teddy.nom} : ${((teddy.price / 100).toFixed(2))} €`)
    title.classList.add("title")
    boxItem.appendChild(title)

    // box image       
    let itemImg = document.createElement("img")
    itemImg.setAttribute("src",teddy.image);
    itemImg.classList.add("itemImg")
    boxItem.appendChild(itemImg)

    // box quantité
    let boxQuantite = document.createElement("div")
    boxQuantite.classList.add("boxQuantite")
    boxQuantite.setAttribute("name","boxQuantite")
    boxItem.appendChild(boxQuantite)

    let boxListeDeroulante = document.createElement("div")
    boxQuantite.appendChild(boxListeDeroulante)
    

    // titre quantité
    let titreQuantite = document.createElement("span")
    titreQuantite.innerHTML = "Quant.:"
    boxListeDeroulante.appendChild(titreQuantite)

    // création de la liste déroulante
    let listeDeroulante = document.createElement("select")
    listeDeroulante.setAttribute("id",`select${x}`)

    for (let i = 1; i <= 10; i++){
        let option = document.createElement("option")
        option.innerHTML = i
        listeDeroulante.appendChild(option)
    }
    listeDeroulante.selectedIndex = (teddy.quantity - 1)
    boxListeDeroulante.appendChild(listeDeroulante)

    // boutton supprimer
    let supprimer = document.createElement("button")
    supprimer.innerHTML = "Supprimer"
    supprimer.setAttribute("id",`supp${x}`)
    supprimer.classList.add("btn__supprimer")
    boxQuantite.appendChild(supprimer)

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
    let recupPrixTotalItem  = document.querySelectorAll(".prixTotalItem")
    let prixTotal = document.getElementById("prixTotal")
    let total = 0
        
    boxPrixTotalItem.innerHTML =  (teddy.quantity * teddy.price / 100).toFixed(2)

    //addition des prix total des items 

    for (let i of recupPrixTotalItem){
        total += parseInt (i.innerHTML)
    }
    prixTotal.innerHTML = (total.toFixed(2) + " €")
}

// AFFICHAGE DES PRIX APRES AVOIR CHOISI LA QUANTITE
function displayNewPrice(teddy,index,x){
    
    let select = document.getElementById(`select${x}`)
    select.addEventListener("change",function(){
        let recupPrixTotalItem  = document.querySelectorAll(".prixTotalItem")
        let boxPrix = document.getElementById(`boxPrix${x}`)
        let boxprixTotal = document.getElementById("prixTotal")
        let prixTotal = 0
        let quantite = select.options[select.selectedIndex].value
        
        // changement de quantité dans le localstorage   
        console.log("la valeur de i est " + index)
        teddy[index].quantity = quantite
        localStorage.setItem("orinoco",JSON.stringify (teddy))
        
        boxPrix.innerHTML = (quantite * teddy[index].price /100).toFixed(2)
        
        for (let i of recupPrixTotalItem){
            prixTotal += parseInt (i.innerHTML)
        }
        boxprixTotal.innerHTML = (prixTotal.toFixed(2) + " €")    
    })
}

// BOUTTON SUPPRIMER
function supprimer(x,teddy,i){

    let product = document.getElementById(`supp${x}`)
    product.addEventListener("click",function(){
        let boxprixTotal = document.getElementById("prixTotal")
        let article = document.getElementById(`article${x}`)
        let prixTotal = 0
        
        //teddy.splice(i,1)
        delete teddy[i]
        localStorage.setItem("orinoco",JSON.stringify(teddy))
        article.remove()
        
        let recupPrixTotalItem  = document.querySelectorAll(".prixTotalItem")
        for (let i of recupPrixTotalItem){
            prixTotal += parseInt(i.innerHTML)
        }    
        boxprixTotal.innerHTML = (prixTotal.toFixed(2) + " €" )  
        
    })  
}

// ENVOIE DES DONNEES AU SERVEUR
function order(basket,i){
    let buttonSubmit = document.getElementById("submit")

    buttonSubmit.addEventListener("click",function(e){
        e.stopImmediatePropagation()
        //e.preventDefault()
        
        let lastNameInput = document.getElementById("lastName").value
        let firstNameInput = document.getElementById("firstName").value
        let cityInput = document.getElementById("city").value
        let adressInput = document.getElementById("adresse").value
        let emailInput = document.getElementById("email").value
        let prixTotal = document.getElementById("prixTotal").innerHTML
        let tabProduct = []

        // tableau des iD pour POST

        for (let i in basket){
            if (basket[i]){
                tabProduct.push(basket[i].id)
            }
        }

        //préparation de l'objet order pour POST

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

        // envoie des données au serveur
        function post(){
            fetch('http://localhost:3000/api/teddies/order', {
            method: "POST",
            body: JSON.stringify(order),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(serveur =>{               
                document.location.href=`confirmation.html?id=${serveur.orderId}&total=${prixTotal}&contact=${orderParse}`;
            });    
        } 
        if (firstNameInput){
            post()      
        } else {
            e.preventDefault
            alert("Veuillez remplire tous les champs du formulaire..")
        }
    })
}



   



