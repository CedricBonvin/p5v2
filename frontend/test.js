


let order = {

    contact: {
        firstName: "cedric",
        lastName: "Bonvin",
        address: "rue Michel 25",
        city: "La place",
        email: "monmail@gmail.com"
       },
    products : ["5be9c8541c9d440000665243","5beaa8bf1c9d440000a57d94"]
}

  
  fetch('http://localhost:3000/api/teddies/order', {
    method: "POST",
    body: JSON.stringify(order),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json.contact.city));


