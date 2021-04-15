let nameOfTheUser = "";
const addmessage = document.querySelector(".chat");

askingName();


//perguntando e enviando nome pro server
function askingName(){
    nameOfTheUser = prompt("Qual seu nome?");

    const postingName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", 
    {name: nameOfTheUser})
   
    postingName.catch(fail)
}

function fail(){
    nameOfTheUser = prompt("Escolha outro usuario");
    const postingName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", 
    {name: nameOfTheUser})
   
    postingName.catch(fail)
}

//requisição de permanencia
setInterval(constantRequisition, 5000)

function constantRequisition(){
    const constantRemander = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", 
    {name: nameOfTheUser})
}

//pegando mensagens do server
let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
promise.then(processMessages);

function processMessages(answer){
    console.log(answer);
    for(let i = 0; i < answer.data.length; i++){
        addmessage.innerHTML +=
        `<li class="singlemessage"><strong>${answer.data[i].from}</strong> para 
        <strong>${answer.data[i].to}</strong>:${answer.data[i].text}.
        </li>`
    }
}



//enviando mensagens
function sendMessage(){
    let textMessage = document.querySelector(".message-of-user").value
    const sendingMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", 
    {from: nameOfTheUser,
     to: "Todos",
     text: textMessage,
     type: "message",
    }
    )
}

const elementoQueQueroQueApareca = document.querySelector(".chat");
elementoQueQueroQueApareca.scrollIntoView();



//sidebar lateral
function sidebar(){
    const takeOutHidden = document.querySelector(".sidebar");
    takeOutHidden.classList.remove("hidden");
}

