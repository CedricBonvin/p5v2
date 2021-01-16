
let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (request.readyState === 4) {

        let WrapperItems = document.getElementById("wrapperItems")
        let result = JSON.parse(request.responseText);
       
        for (let i in result){
  
            let article = document.createElement("article");
            let cardName = document.createElement("h3");
            let cardImage = document.createElement("img");
            let cardDescription = document.createElement("p");
            let cardPrice = document.createElement("i");

            cardName.innerHTML=(result[i].name);
            cardImage.setAttribute("src", result[i].imageUrl);
            cardDescription.innerHTML=(result[i].description);
            cardPrice.innerHTML=(result[i].price);

            WrapperItems.appendChild(article);
            article.appendChild(cardName);
            article.appendChild(cardImage);
            article.appendChild(cardDescription);
            article.appendChild(cardPrice);

            article.classList.add ("card")
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies",true);
request.send(); 














                                  