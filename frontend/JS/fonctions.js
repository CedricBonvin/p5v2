
//AFFICHE LE NOMBRE D'ARTICLE DE L'ICONE PANIER DANS LE HEADER
function nbrArticleHeader(){

    let nbrArticle = 0
    let nbrArticleHeader = document.querySelector(".nbrArticleIcone")
    let storage = JSON.parse(localStorage.getItem("orinoco"))
    if (storage){
        for (let i in storage){
            if (storage[i]){
                nbrArticle += parseInt (storage[i].quantity)
                nbrArticleHeader.innerHTML = nbrArticle
                nbrArticleHeader.style.display = "block"
            } else if (nbrArticle === 0){
                nbrArticleHeader.style.display = "none"
            }
        }
    } 
} 

// RECTIFICATION DU PRIX DE L'API + € 

function splitPrice (prix){
    return  ((prix/100).toFixed(2) + " €")
  }

