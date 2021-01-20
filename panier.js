
let recup = document.getElementById("recup")
let tabPrix = []

for (let i = 0 ; i< localStorage.length; i++){

    let itemJS = JSON.parse(localStorage.getItem(localStorage.key(i)));
   
    // CREATION BOX ITEM-PANIER

    let boxItem = document.createElement ("div")
    boxItem.classList.add("boxItemPanier")
    recup.appendChild(boxItem)

    //  INJECTION VALEURS DES ITEMS

    // box image 

    let itemImg = document.createElement("img")
    itemImg.setAttribute("src",itemJS.imageUrl);
    itemImg.classList.add("itemImg")
    boxItem.appendChild(itemImg)

    // box (  name + prix  )

    let itemName = document.createElement("h3")
    itemName.innerHTML = itemJS.name
    boxItem.appendChild(itemName)


    let itemPrice = document.createElement("div")
    itemPrice.innerHTML = itemJS.price
    itemPrice.classList.add("itemPrice")
    itemPrice.classList.add("prix")
    itemName.appendChild(itemPrice)
    
    // box quantité
    
    let boxQuantite = document.createElement("div")
    boxQuantite.classList.add("boxQuantite")
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
    boxItem.appendChild(boxPrixTotalItem)  

    // CREATION LISTE DEROULANTE

    let listeDeroulante = document.createElement("select")

    for (let i = 0; i <= 10; i++){
        let option = document.createElement("option")

        
        option.innerHTML = i
        listeDeroulante.appendChild(option)
        //  if (i = 1){
        //      option.setAttribute("selected")
        //  }
    }
    boxQuantite.appendChild(listeDeroulante)

    

    
    //...................  RECUPERATION DES VALEURS DE LA LISTE DEROULANTE.....................
    
    
    
        
    listeDeroulante.addEventListener("change",function(){

        let choice = listeDeroulante.selectedIndex
        let quantite = listeDeroulante.options[choice].value       
        let tabPrixResult = 0
        let prixTotalItem = itemJS.price * quantite
        
        if (tabPrix[i] >= 0){
            tabPrix.splice(i,1,prixTotalItem)
        }else {
            tabPrix.push(prixTotalItem)
        } 
        
        for (let i = 0; i<tabPrix.length; i++){
            tabPrixResult += tabPrix[i]
        }  
        
        // injection du prix total des Items
        
        boxPrixTotalItem.innerHTML = prixTotalItem    
        boxPrixTotal.appendChild(prixTotalCol2)

        // injection du prix TOTAL
        
        prixTotalCol2.innerHTML = tabPrixResult + " €"
    })
    
    
}
    
// PRIX TOTAL AFFICHAGE

let boxPrixTotal = document.getElementById("boxPrixTotal")

// AFFICHAGE DU PRIX TOTAL PAR DEFAUT

let prixTotalCol1 = document.createElement("div")
prixTotalCol1.innerHTML = "total"
boxPrixTotal.appendChild(prixTotalCol1)

let prixTotalCol2 = document.createElement ("div")
prixTotalCol2.innerHTML = "€"
boxPrixTotal.appendChild(prixTotalCol2)



   


    