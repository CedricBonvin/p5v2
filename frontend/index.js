
fetch("http://localhost:3000/api/teddies").then(response => response.json()).then(result =>{
    for (let i in result){            
        displayProduct(result[i])
        nbrArticleHeader()
    }
})
function displayProduct (teddy){
    let WrapperItems = document.getElementById("wrapperItems")

    // cération des éléments
    let article = document.createElement("article");
    let link = document.createElement("a")
    let cardName = document.createElement("h3");
    let cardImage = document.createElement("img");
    let cardDescription = document.createElement("p");
    let cardPrice = document.createElement("i");
    let check = document.createElement("div")
    
    // Envoie de l'ID de l'article dans l'url
    link.setAttribute ("href",`custom.html?id=${teddy._id}`)

    // Injection du contenu dans les éléments
    cardName.innerHTML=(teddy.name);
    cardImage.setAttribute("src", teddy.imageUrl);
    cardDescription.innerHTML=(teddy.description);
    cardPrice.innerHTML=splitPrice(teddy.price);

    // Injection des éléments dans le DOM
    WrapperItems.appendChild(link);
    link.appendChild(article);
    article.appendChild(cardName);
    article.appendChild(cardImage);
    article.appendChild(cardDescription);
    article.appendChild(cardPrice);
    article.appendChild(check);

    // ajout des classes
    article.classList.add ("card");            
}
















                                  