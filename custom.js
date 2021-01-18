

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
            
            localStorage.removeItem(localStorage.key(i));

            el.style.display =("none")
        })

    //  BOUTTON COMMANDER

    itemValue = document.createElement("button");
    itemValue.innerHTML = "choisissez votre couleur";
    itemValue.classList.add ("btn__couleur");
    el.appendChild(itemValue);  
}

























