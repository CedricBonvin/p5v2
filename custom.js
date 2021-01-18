

let recup = document.getElementById("recup");

for (let i = 0; i<localStorage.length; i++){

    // PARSE DE LOCALSTORAGE

    let itemJS = JSON.parse (localStorage.getItem(localStorage.key(i)));

    // CREATION DE LA CARTE 

    let el = document.createElement("div");
    recup.appendChild(el);
    el.classList.add("cardCustom");

    // RECUP. DES VALEURS + AJOUT DANS LA CARTE 
    
    let itemValue = document.createElement("h3");
    itemValue.innerHTML = itemJS.name;
    el.appendChild(itemValue);

    itemValue = document.createElement("p");
    itemValue.innerHTML = itemJS.description;
    el.appendChild(itemValue);
    
    itemValue = document.createElement("img");
    itemValue.setAttribute("src",itemJS.imageUrl);
    el.appendChild(itemValue);

    itemValue  = document.createElement("div");
    itemValue.innerHTML = itemJS.price;
    itemValue.classList.add ("prix");
    el.appendChild(itemValue );

  

    // BOUTTON SUPPRIMER

    let supprimer = document.createElement("button");
    supprimer.innerHTML = ("supprimer");
    supprimer.classList.add ("btn");
    el.appendChild (supprimer);

        supprimer.addEventListener("click",function(){

           if (localStorage.key(i)){
            localStorage.removeItem(localStorage.key(i));

            el.style.display =("none")
             } 
        //  localStorage.removeItem(localStorage.key(i));
        // el.style.display =("none")
        })

       

    //  BOUTTON CHOISR COULEUR

    bouttonCouleur = document.createElement("button");
    bouttonCouleur.innerHTML = "choisissez votre couleur";
    bouttonCouleur.classList.add ("btn__couleur");
    el.appendChild(bouttonCouleur);  

    // BOX COULEUR

    let boxCouleur = document.createElement("div")
    boxCouleur.setAttribute("id","boxCouleur")
    boxCouleur.innerHTML = "Choisissez votre couleur"
    el.appendChild(boxCouleur)
    boxCouleur.classList.add("boxCouleur")
    
    bouttonCouleur.addEventListener("click",function(){
        

        boxCouleur.style.opacity = "1"
        boxCouleur.style.transform = "scaleY(1)"
        boxCouleur.style.height = "100%"
        
    })

    //SELECT


    let listeDeroulante = document.createElement("select")
    boxCouleur.appendChild(listeDeroulante)
    listeDeroulante.style.marginLeft = "5px"

    

    for (let i = 0; i < itemJS.colors.length; i++){
        let option = document.createElement("option")
        option.setAttribute("value",itemJS.colors[i])
        option.innerHTML = itemJS.colors[i]
        listeDeroulante.appendChild(option);
       
    }
    // RENDU COULEUR

    let renduCouleur = document.createElement("div");
    renduCouleur.classList.add("renduCouleur")
    boxCouleur.appendChild(renduCouleur)
  
    

    let choice
    let valeurCouleur

    renduCouleur.style.background = listeDeroulante.options[0].value

    
    listeDeroulante.addEventListener("change",function(){
        
        choice = listeDeroulante.selectedIndex
        
        valeurCouleur = listeDeroulante.options[choice].value
        renduCouleur.style.background = valeurCouleur
       

    })

}

























