
let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (request.readyState === 4) {
        let result = JSON.parse(request.responseText);   
        for (let i in result){            
            displayProduct(result[i])
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send(); 


// ----------------------------------------  F O N C T I O N    ---------------------------------------------------

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
    
    // Envoie de l'ID dans l'url

    link.setAttribute ("href",`custom.html?id=${teddy._id}`)

    // Injection du contenu dans les éléments

    cardName.innerHTML=(teddy.name);
    cardImage.setAttribute("src", teddy.imageUrl);
    cardDescription.innerHTML=(teddy.description);
    cardPrice.innerHTML=(teddy.price /100 + ".00");

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

    return article             
}














                                  