// askingname();

const nameOfTheUser;

function askingname(){
    nameOfTheUser = prompt("Qual seu nome?");

    const postingName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", 
    {name: nameOfTheUser})
   
    postingName.then(goon)
    postingName.catch(fail)
}

function goon(){
    alert("Deu bom, entra ai")
}

function fail(){
    nameOfTheUser = prompt("Escolha outro usuario");
}

setInterval(constantRequisition, 5000)

function constantRequisition(){
    const constantremander = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", 
    {name: nameOfTheUser})
}

function sidebar(){
    const takeOutHidden = document.querySelector(".sidebar");
    takeOutHidden.classList.remove("hidden");
}

