    

let requete = new XMLHttpRequest()

 requete.onreadystatechange = function(){

    if (requete.readyState === 4){
        let produit = JSON.parse(requete.responseText);   
        
        for (let i = 0; i<produit.length; i++){
        }
        return produit
    }
}
requete.open("GET", "http://localhost:3000/api/teddies");
requete.send(); 



