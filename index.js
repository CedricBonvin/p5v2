

let request = new XMLHttpRequest();


request.onreadystatechange = function() {
    if (request.readyState === 4) {

        let WrapperItems = document.getElementById("wrapperItems")
        let result = JSON.parse(request.responseText);
     
        for (let i in result){
            
            //  Création des éléments
            
            let article = document.createElement("article");
            let cardName = document.createElement("h3");
            let cardImage = document.createElement("img");
            let cardDescription = document.createElement("p");
            let cardPrice = document.createElement("i");
            let check = document.createElement("div")
            
            // Injection du contenu dans les éléments

            cardName.innerHTML=(result[i].name);
            cardImage.setAttribute("src", result[i].imageUrl);
            cardDescription.innerHTML=(result[i].description);
            cardPrice.innerHTML=(result[i].price);

            // Injection des éléments dans le DOM

            WrapperItems.appendChild(article);
            article.appendChild(cardName);
            article.appendChild(cardImage);
            article.appendChild(cardDescription);
            article.appendChild(cardPrice);
            article.appendChild(check);

            // ajout des classes

            article.classList.add ("card");

            // Récupération des données des ITEMS au click


            article.addEventListener("click", function(){
                check.classList.toggle("check");
                
                let nom = result[i].name;
                if (check.classList.contains("check") === true){
    
                    console.log("yes check")  
                    localStorage.setItem(nom,JSON.stringify(result[i]));      
    
                }else 
                localStorage.removeItem(nom,JSON.stringify(result[i]));      
            })
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies",true);
request.send(); 














                                  