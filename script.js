let nameOfTheUser = "";
const addmessage = document.querySelector(".chat");

askingName();


//perguntando e enviando nome pro server
function askingName(){
    nameOfTheUser = prompt("Qual seu nome?");

    const postingName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", 
    {name: nameOfTheUser})
   
    postingName.then(goOn)
    postingName.catch(fail)
}

function goOn(){
    setInterval(receivingMessages, 3000)
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
function receivingMessages(){
    let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promise.then(processMessages);
}

function processMessages(answer){
    console.log(answer);
    addmessage.innerHTML = "";

    for(let i = 0; i < answer.data.length; i++){

        if(answer.data[i].type === "status"){
            addmessage.innerHTML +=
            `<li class="single-message status"><p class="sent-time"> (${answer.data[i].time})
            </p>&nbsp;<strong>${answer.data[i].from}</strong> &nbsp;para&nbsp;
            <strong>${answer.data[i].to}</strong>: ${answer.data[i].text}
            </li>`
        } else if (answer.data[i].type === "message") {
            addmessage.innerHTML += 
            `<li class="single-message message"><p class="sent-time"> (${answer.data[i].time})
            </p>&nbsp;<strong>${answer.data[i].from}</strong> &nbsp;para&nbsp;
            <strong>${answer.data[i].to}</strong>: ${answer.data[i].text}
            </li>`
        } else if (answer.data[i].type === "private_message") {
            addmessage.innerHTML +=
            `<li class="single-message private-message"><p class="sent-time"> (${answer.data[i].time})
            </p>&nbsp;<strong>${answer.data[i].from}</strong> &nbsp;para&nbsp;
            <strong>${answer.data[i].to}</strong>: ${answer.data[i].text}
            </li>`
        }
    }

     const newMessages = document.querySelector('.chat li:last-child');
    newMessages.scrollIntoView();

}



//enviando mensagens
function sendMessage(){
    let textMessage = document.querySelector(".message-of-user").value
    const sendingMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", 
    {from: nameOfTheUser,
     to: "Todos",
     text: textMessage,
     type: "message",
    })
    
    sendingMessage.then(goOn)
    sendingMessage.catch(fail)

}


//sidebar lateral
function sidebar(){
    const takeOutHidden = document.querySelector(".sidebar");
    takeOutHidden.classList.remove("hidden");

    let lookingForNewPeople = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
    lookingForNewPeople.then(findingNewPeople)
}

function findingNewPeople(names){
    console.log(names);
    const chooseName = document.querySelector(".name-to-choose");
    for(let i = 0; i < names.data.length; i++){
        chooseName.innerHTML += 
        `<li class="choice"><ion-icon name="person-circle" class="ionchoice"></ion-icon> ${names.data[i].name}
        <ion-icon name="checkmark" class="greenmark hidden"></ion-icon>
        </li>`
    }

}

