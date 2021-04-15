//askingName();

const addmessage = document.querySelector(".chat");

let nameOfTheUser = "";

//perguntando e enviando nome pro server
function askingName(){
    let nameOfTheUser = prompt("Qual seu nome?");

    const postingName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", 
    {name: nameOfTheUser})
   
    postingName.then(goOn)
    postingName.catch(fail)
}

function goOn(){
    alert("Deu bom, entra ai")
}

function fail(){
    nameOfTheUser = prompt("Escolha outro usuario");
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
    const sendingMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", 
    {from: nameOfTheUser,
     to: "nome do destinatário (Todos se não for um específico)",
     text: "mensagem digitada",
     type: "message"
    }
    )

}

//sidebar lateral
function sidebar(){
    const takeOutHidden = document.querySelector(".sidebar");
    takeOutHidden.classList.remove("hidden");
}

