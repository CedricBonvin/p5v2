fetch("http://localhost:3000/api/teddies/"+recupID()).then(response => response.json()).then(result =>{
    displayItem(result)             
    displayColorWrapper(result)
    displaySampleColor()
    addBasket( result)        
})
// -------------------------     F O N C T I O N S   --------------------------------------//

// RECUPERATION DE L'ID
function recupID(){
    const queryID = window.location.search;
    let idTeddy = new URLSearchParams(queryID).get("id");
    return idTeddy
}
// AFFICHAGE DE L'ITEM
function displayItem(teddy){

    // création des éléments et injection des valeurs

    let recup = document.getElementById("recup");

    let el = document.createElement("div");
    recup.appendChild(el);
    el.classList.add("cardCustom");

    let itemValue = document.createElement("h3");
    itemValue.innerHTML = teddy.name;
    el.appendChild(itemValue);

    itemValue = document.createElement("p");
    itemValue.innerHTML = teddy.description;
    el.appendChild(itemValue);

    itemValue = document.createElement("img");
    itemValue.setAttribute("src",teddy.imageUrl);
    el.appendChild(itemValue);

    let wrapperColor = document.createElement ("div")
    wrapperColor.setAttribute("id","wrapperColor")
    el.appendChild(wrapperColor)

    //  boutton ajouter au panier

    let bouttonPanier = document.createElement("a");
    bouttonPanier.innerHTML = `ajouter au panier ${teddy.price / 100}.00 €`;
    bouttonPanier.classList.add ("btn__panier");
    bouttonPanier.setAttribute("href","panier.html")
    bouttonPanier.setAttribute("id","basketButton")
    el.appendChild(bouttonPanier);

}
// AFFICHE WRAPPER CHOIX COULEUR
function displayColorWrapper(teddy){

    let wrapperColor = document.getElementById ("wrapperColor")
    wrapperColor.classList.add("wrapperColor")

    let colorSample = document.createElement("div")
    colorSample.innerHTML = "Choisissez votre couleur"
    wrapperColor.appendChild(colorSample)

    let listeDeroulante = document.createElement("select")
    listeDeroulante.setAttribute("id","dropDownList")
    wrapperColor.appendChild(listeDeroulante)

    for (let i = 0; i < teddy.colors.length; i++){
        let option = document.createElement("option")
        option.innerHTML = teddy.colors[i]
        option.setAttribute("value",teddy.colors[i])
        listeDeroulante.appendChild(option); 
    }

    let sampleColor = document.createElement("div")
    sampleColor.setAttribute("id","sampleColor")
    sampleColor.classList.add("sampleColor")
    wrapperColor.appendChild(sampleColor)
}
// AJOUT AU PANIER
function addBasket(teddy){
    let basketButton = document.getElementById("basketButton")
    basketButton.addEventListener("click",function(e){

        let choice = dropDownList.selectedIndex
        let colorValue= dropDownList.options[choice].value
        // création de l'objet
       let obj = {
           nom: teddy.name,
           price: teddy.price,
           colorChoice: colorValue,
           quantity: 1,
           id : teddy._id,
           image :teddy.imageUrl
       };
       // localstorage
       let recup = JSON.parse(localStorage.getItem("orinoco"))
       if (recup){
            recup.push (obj)
            localStorage.setItem("orinoco",JSON.stringify(recup))
       } else if (!recup){
            let tab = []
            tab.push(obj)
            localStorage.setItem("orinoco",JSON.stringify(tab))
       }
    })   
}
// AFFICHAGE DE L'ECHANTILLON DE COULEUR
function displaySampleColor(){

    let sampleColor = document.getElementById("sampleColor")
    //let dropDownList = document.getElementById("dropDownList")
    sampleColor.style.background = dropDownList.options[0].value
    //let colorValue = dropDownList.options[0].value

    dropDownList.addEventListener("change",function(){ 
        let choice = dropDownList.selectedIndex
         let colorValue= dropDownList.options[choice].value
        sampleColor.style.background = colorValue
    })

    //return colorValue
}



























//     // BOUTTON SUPPRIMER

//     let supprimer = document.createElement("button");
//     supprimer.innerHTML = ("supprimer");
//     supprimer.classList.add ("btn");
//     el.appendChild (supprimer);

//         supprimer.addEventListener("click",function(){

//            if (localStorage.key(i)){
//             localStorage.removeItem(localStorage.key(i));

//             el.style.display =("none")
//              } 
//         //  localStorage.removeItem(localStorage.key(i));
//         // el.style.display =("none")
//         })      

//       

//     // ECHANTILLON DE COULEUR

//     let boxCouleur = document.createElement("div")
//     boxCouleur.setAttribute("id","boxCouleur")
//     boxCouleur.innerHTML = "Choisissez votre couleur"
//     el.appendChild(boxCouleur)
//     boxCouleur.classList.add("boxCouleur")
    
//     bouttonCouleur.addEventListener("click",function(){
        
//         boxCouleur.style.opacity = "1"
//         boxCouleur.style.transform = "scaleY(1)"
//         boxCouleur.style.height = "100%"
        
//     })

//     //SELECTION DE LA COULEUR

//     let listeDeroulante = document.createElement("select")
//     boxCouleur.appendChild(listeDeroulante)
//     listeDeroulante.style.marginLeft = "5px"

//     for (let i = 0; i < itemJS.colors.length; i++){
//         let option = document.createElement("option")
//         option.setAttribute("value",itemJS.colors[i])
//         option.innerHTML = itemJS.colors[i]
//         listeDeroulante.appendChild(option);
       
//     }
//     // RENDU COULEUR

//     let renduCouleur = document.createElement("div");
//     renduCouleur.classList.add("renduCouleur")
//     boxCouleur.appendChild(renduCouleur)
  
//     let choice
//     let valeurCouleur

//     renduCouleur.style.background = listeDeroulante.options[0].value
  
//     listeDeroulante.addEventListener("change",function(){
        
//         choice = listeDeroulante.selectedIndex
        
//         valeurCouleur = listeDeroulante.options[choice].value
//         renduCouleur.style.background = valeurCouleur
//     })
// }


























