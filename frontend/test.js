



let tab = document.querySelectorAll(".alo")
let rep = document.getElementById("rep")
let total = 0
for (let i of  tab){
  total += parseInt (i.innerHTML)
  
}
rep.innerHTML=total
