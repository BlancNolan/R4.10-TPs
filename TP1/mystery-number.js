
let number = Math.round(Math.random() * 100);
let essais = 0;
document.querySelector("#section1 #btn")?.addEventListener("click", () => {
    essais++;
    let guess = document.querySelector("#section1 #guess").value;
    document.querySelector("table").insertRow().insertCell().appendChild(document.createTextNode(guess));

    if(guess > number){
        document.querySelector("#section1 #anwser").textContent = "C'est moins"; 
    }else if(guess < number){
        document.querySelector("#section1 #anwser").textContent = "C'est plus"; 
    }else{
        window.alert("vous avez réussi en "+ essais + " essais")
        window.location.reload()
    }
});
