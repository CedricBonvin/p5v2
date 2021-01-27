
let tabPrix = []

for (let i = 0; i< localStorage.length; i++){
    let teddyStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));

    displayStorage(teddyStorage)

    let select = document.getElementsByTagName("select")
    displayBasicPrice(teddyStorage)      
    displayNewPrice(select[i],teddyStorage, i) 
}   
    
// -------------------------    F U N C T I O N  ---------------------//

// AFFICHAGE DES ITEMS

function displayStorage (teddy) {

    // CREATION BOX ITEM-PANIER

    let boxItem = document.createElement ("div")
    boxItem.classList.add("boxItemPanier")
    recup.appendChild(boxItem)     
    //  INJECTION VALEURS DES ITEMS   

   // box image       
    let itemImg = document.createElement("img")
    itemImg.setAttribute("src",teddy.imageUrl);
    itemImg.classList.add("itemImg")
    boxItem.appendChild(itemImg)

    // box (  name + prix  )

    let itemName = document.createElement("h3")
    itemName.innerHTML = teddy.name
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

    let titreQuantite = document.createElement("h4")
    titreQuantite.innerHTML = "Quantite"
    boxQuantite.appendChild(titreQuantite)

    // Box Prix

    let boxPrixItem = document.createElement("div")
    boxPrixItem.classList.add("boxPrixItem")
    boxItem.appendChild(boxPrixItem)

    // prix item

    let boxPrixTotalItem = document.createElement("div")
    boxPrixTotalItem.classList.add("prixTotalItem")
    boxPrixTotalItem.classList.add("prix")
    boxPrixTotalItem.setAttribute("id",teddy._id)
    boxItem.appendChild(boxPrixTotalItem) 

   // création de la liste déroulante
  
    let listeDeroulante = document.createElement("select")
 
    for (let i = 1; i <= 10; i++){
        let option = document.createElement("option")
        option.innerHTML = i
        listeDeroulante.appendChild(option)
    }
    listeDeroulante.selectedIndex = (teddy.quantity - 1)
    boxQuantite.appendChild(listeDeroulante)
}

 // AFFICHAGE DU PRIX A L'ARRIVER SUR LA PAGE

function displayBasicPrice (teddy){

    let boxPrixTotalItem = document.getElementById(teddy._id)
    let boxprixTotal = document.getElementById("prixTotal")
    
    // parse du localstorage
    
    let teddyParse = JSON.parse(localStorage.getItem(teddy._id))
    tabPrix.push(parseInt(teddyParse.quantity * teddy.price))

    // affichage prix

    boxPrixTotalItem.innerHTML = teddyParse.quantity * teddy.price
    recupPrixTotal = 0
    for (let i of tabPrix){
        recupPrixTotal += i
    }
    boxprixTotal.innerHTML = recupPrixTotal
}

// AFFICHAGE DES PRIX APRES AVOIR CHOISI LA QUATITE

function displayNewPrice(select,teddy,index){
    
    select.addEventListener("change",function(){
        
        let boxPrix = document.getElementById(teddy._id)
        let boxprixTotal = document.getElementById("prixTotal")
        let prixTotal = 0
        let quantite = this.options[this.selectedIndex].value

        // changement de quantité dans le localstorage

        teddy.quantity = quantite
        boxPrix.innerHTML = teddy.quantity * teddy.price
        localStorage.setItem(teddy._id,JSON.stringify(teddy))
        
        tabPrix.splice( index ,1, teddy.price * quantite)
        
        for (let i of tabPrix){
            prixTotal += i
        }

        boxprixTotal.innerHTML = prixTotal 
        prixTotal = 0
    })
}

   




    

    
//     //...................  RECUPERATION DES VALEURS DE LA LISTE DEROULANTE.....................
    
    
    
        
//     listeDeroulante.addEventListener("change",function(){

//         let choice = listeDeroulante.selectedIndex
//         let quantite = listeDeroulante.options[choice].value       
//         let tabPrixResult = 0
//         let prixTotalItem = itemJS.price * quantite

//         // Recupération de l'ID et de la quantité pour POST 

//         id = itemJS._id
//         nbrItem = quantite
//         recupID[id] = nbrItem


//         // ajout du prix total des Items dans le tableau " tabPrix " 
         
//         tabPrix.splice(i,1,prixTotalItem)  

//         //  Montant total
        
//         for (let i = 0; i<tabPrix.length; i++){
//             tabPrixResult += tabPrix[i]
//         }  
        
//         // injection du prix total des Items
        
//         boxPrixTotalItem.innerHTML = prixTotalItem    

//         // injection du prix TOTAL
        
//         prixTotalCol2.innerHTML = tabPrixResult + " €"

//         // TRAITEMENT  POUR " POST /"
        
      
//         let itemId = itemJS._id

//        let nn = postArray.indexOf(itemId)
//        postArray.filter((itemId, nn))
       
    
//             for (let y = 0; y < quantite; y++ ){
        
//                 postArray.push(itemId)
//             } 
//     })     
// }

    
// PRIX TOTAL AFFICHAGE

//let boxPrixTotal = document.getElementById("boxPrixTotal")

// AFFICHAGE DU PRIX TOTAL PAR DEFAUT

// let prixTotalCol1 = document.createElement("div")
// prixTotalCol1.innerHTML = "total"
// boxPrixTotal.appendChild(prixTotalCol1)

// let prixTotalCol2 = document.createElement ("div")
// prixTotalCol2.innerHTML = "0 €"
// boxPrixTotal.appendChild(prixTotalCol2)
