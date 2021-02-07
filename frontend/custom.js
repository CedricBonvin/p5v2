fetch("http://localhost:3000/api/teddies/"+recupID()).then(response => response.json()).then(result =>{
    displayItem(result)             
    displayColorWrapper(result)
    displaySampleColor()
    addBasket( result) 
    nbrArticleHeader()       
})
/////////////////////    F O N C T I O N S   ///////////////////////

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
    bouttonPanier.innerHTML = `ajouter au panier ${splitPrice(teddy.price)}`;
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
    basketButton.addEventListener("click",function(){

        let choice = dropDownList.selectedIndex
        let colorValue= dropDownList.options[choice].value     // !!!!!!!! pourquoi j'arrive à le récupérer !!!!!
        // création de l'objet
        let article = {
            nom: teddy.name,
            price: teddy.price,
            colorChoice: colorValue,
            quantity: 1,
            id : teddy._id,
            image :teddy.imageUrl
       };
       // création du tableau dans le localstorage
        let articleArray = JSON.parse(localStorage.getItem("orinoco"))
        if(articleArray){
            articleArray.push (article)
            localStorage.setItem("orinoco",JSON.stringify(articleArray))
        }else if (!articleArray){
            articleArray = []
            articleArray.push(article)
            localStorage.setItem("orinoco",JSON.stringify(articleArray))
        }
    })   
}
// AFFICHAGE DE L'ECHANTILLON DE COULEUR
function displaySampleColor(){
    //let dropDownList = document.getElementById("dropDownList")      !!!!!!!! Pourquoi j'arrive à le récupérer
    //let colorValue = dropDownList.options[0].value
    
    let sampleColor = document.getElementById("sampleColor")
    sampleColor.style.background = dropDownList.options[0].value
    if (dropDownList.options[0].value === "Pale brown"){
        sampleColor.style.background = "#957A52"
    } 

    dropDownList.addEventListener("change",function(){ 
        let choice = dropDownList.selectedIndex
        let colorValue= dropDownList.options[choice].value

        if (colorValue === "Dark brown"){
            colorValue =" #654321"
        }
        if (colorValue === "Pale brown"){
            colorValue = "#957A52"
        } 

        sampleColor.style.background = colorValue
    })
}















































