// variable indexé sur chaque article affiché, ( pour récupération cibler par ID )
let x = -1

let ted = JSON.parse(localStorage.getItem("orinoco"))
for (let i in ted){
    if (ted[i]){
        displayStorage(ted[i])
        displayBasicPrice(ted[i],x) 
        displayNewPrice(ted, i,x) 
        supprimer(x,ted,i)
        order(ted,i) 
    }      
}
nbrArticleHeader()
emptyBasket()

// -----------------   F U N C T I O N S  ---------------------//

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
    title.innerHTML = (`${teddy.nom} : ${splitPrice(teddy.price)}`)
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
        
    boxPrixTotalItem.innerHTML =  splitPrice(teddy.quantity * teddy.price)

    //addition des prix total des items 

    for (let i of recupPrixTotalItem){
        total += parseInt (i.innerHTML)
    }
   
    prixTotal.innerHTML = splitPrice(total * 100)
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
        teddy[index].quantity = quantite
        localStorage.setItem("orinoco",JSON.stringify (teddy))
        // affichge du prix total
        boxPrix.innerHTML =  splitPrice(quantite * teddy[index].price)
        
        for (let i of recupPrixTotalItem){
            prixTotal += parseInt (i.innerHTML)
        }
        boxprixTotal.innerHTML = splitPrice(prixTotal*100)  
        nbrArticleHeader()
    })
}

// BOUTTON SUPPRIMER
function supprimer(x,teddy,i){

    let product = document.getElementById(`supp${x}`)
    product.addEventListener("click",function(){
        let boxprixTotal = document.getElementById("prixTotal")
        let article = document.getElementById(`article${x}`)
        let prixTotal = 0
        
        delete teddy[i]
        localStorage.setItem("orinoco",JSON.stringify(teddy))
        article.remove()
        
        let recupPrixTotalItem  = document.querySelectorAll(".prixTotalItem")
        for (let i of recupPrixTotalItem){
            prixTotal += parseInt(i.innerHTML)
        }    
        boxprixTotal.innerHTML = splitPrice(prixTotal * 100)  
        emptyBasket()   
        nbrArticleHeader()   
    })  
}

// SI PANIER EST VIDE AFFICHAGE DE LA BOX PANIER VIDE SUR LA PAGE PANIER
function emptyBasket(){
    
    let storage = JSON.parse (localStorage.getItem("orinoco"))
    let buttonSubmit = document.getElementById("submit")
    let articleStorage = 0
    let display = true

    // test : Si une valeur existe dans le localstorage => " orinoco "
    if (storage){
        for (let i in storage){
            if (storage[i]){
                display = false
                articleStorage ++
                break
            }
        }
    }
    //alert panier vide 
    buttonSubmit.addEventListener("click",function(e){
        e.stopImmediatePropagation
        if (articleStorage === 0){
            alert("Veuillez choisir un article")
            e.preventDefault
        }
    })

    // injection de la box panier vide
    if (display){
        let titleBoxPanier = document.getElementById("titleBoxPanier")
        let boxEmptyBasket = document.createElement ("div")
        
        boxEmptyBasket.innerHTML="Votre panier est vide"
        boxEmptyBasket.classList.add("emptyBasket")
        titleBoxPanier.appendChild(boxEmptyBasket)      
    }
}

// ENVOIE DES DONNEES AU SERVEUR
function order(basket,i){
    let buttonSubmit = document.getElementById("submit")

    buttonSubmit.addEventListener("click",function(e){
        e.stopImmediatePropagation()
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

        // envoie des données au serveur... si test valider
        if (testValide()){
            fetch('http://localhost:3000/api/teddies/order', {
            method: "POST",
            body: JSON.stringify(order),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(serveur =>{               
                document.location.href=`confirmation.html?id=${serveur.orderId}&total=${prixTotal}&contact=${orderParse}`;
            });              
        } else {
            e.preventDefault
        }
    })
}

// TEST DU FORMULAIRE ET DU TABLEAU DES PRODUITS 
function testValide (){
    let lastNameInput = document.getElementById("lastName").value
    let firstNameInput = document.getElementById("firstName").value
    let cityInput = document.getElementById("city").value
    let adressInput = document.getElementById("adresse").value
    let emailInput = document.getElementById("email").value
    let firstName = "Prénom"; let lastName = "Nom"; let adresse = "Adresse"; let city = "Ville"; let email = "E-mail"
    let isValid = true;

    if (
        firstNameFalse(firstNameInput,firstName) ||
        lasteNameFalse(lastNameInput,lastName) ||
        cityFalse(cityInput,city) ||
        adresseFalse(adressInput,adresse) ||
        emailFalse(emailInput,email) ||
        basketFalse()
        ){ 
        isValid = false; 
    }
    return isValid   

    /////////////////////////////////////////////////////////////////
    ////// DECLARATION DE FONCTION POUR LES TESTS DU FORMULAIRE  //// 
    /////////////////////////////////////////////////////////////////

    // test si le champ est vide
    function isEmpty(inputValue,champ){
        if (!inputValue){
            alert(`Veuillez renseigner le champ ${champ}`)
            return true          
        }
    }
    // test du prénom
    function firstNameFalse (inputValue,champ){
        let regexString =/^[a-zA-Zé-]+$/

        if (isEmpty(inputValue,champ)){
            return true
        }
       if (inputValue.length > 20){
           alert(`Le champ " Prénom " peut contenir 20 caractères au maximum`)
           return true
       }
       if (!inputValue.match(regexString)){
           alert(`Dans le champ " Prénom  " Veuillez utiliser seulement des caractères alphabétique`)
           return true
       }
    }
    //test du nom
    function lasteNameFalse (inputValue,champ){
        if (isEmpty(inputValue,champ)){
            return true
        }
        if (inputValue.length > 20){
            alert(`Le champ " Nom" peut contenir 20 caractères au maximum`)
            return true
        }
    }
    // test ville 
    function cityFalse(inputValue,champ){
        if (isEmpty(inputValue,champ)){
            return true
        }
        if (inputValue.length > 20){
            alert("Le champ ville peut contenir 20 caractères au maximum ")
            return true
        }
    }
    //test adresse 
    function adresseFalse(inputValue,champ){
        if(isEmpty(inputValue,champ)){
            return true
        }
        if (inputValue.length > 30){
            alert(`Le champ ${champ} ne peut contenir que 30 caractères aux maximum.`)
            return true
        }
    }
    // test E-mail
    function emailFalse(inputValue,champ){
        let RegexArrobase = /[@]/
        if (isEmpty(inputValue,champ)){
            return true
        }       
        if (!inputValue.match(RegexArrobase)){
            alert(`votre E-mail ne semble pas être valide.`)
            return true
        }
    }
    // test panier 
    function basketFalse(){
        let storage = JSON.parse (localStorage.getItem("orinoco"))
        let articleStorage = 0
        if (storage){
            for (let i in storage){
                if (storage[i]){
                    articleStorage ++
                }
            }
        } 
        if (articleStorage === 0){
            alert("Veuillez choisir un article")
            return true
        }   
    }
} 







