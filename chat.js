let totalMessages = 0;

function getMessages() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://tiy-28202.herokuapp.com/chats');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = totalMessages; i < response.chats.length; i++){
                    if (response.chats.length === totalMessages){
                    } else {
                        addMessage(response.chats[i]);
                    }
            }

            for (let i = 0; i < response.chats.length; i++){
                let array = response.chats[i].message.split(" ");
                console.log(array);
                for (let c = 0; c < array.length; c++){
                    let arrayTwo = array[c].split("");
                    console.log(arrayTwo);
                    console.log(arrayTwo[0]);
                    if(arrayTwo[0] === 'h') {
                        return true;  // Not sure why this isn't working
                    }
                }
            }     
    });

    request.send();
}

function addMessage(message) {

    let parent = document.querySelector('.convo');
    parent.classList.add('convo');

    // Components of SENT Message

    let sent = document.createElement('div');
    sent.classList.add('sent');

    let bubble = document.createElement('div');
    bubble.classList.add('bubble');

    let text = document.createElement('p');
    text.classList.add('text');
    text.textContent = message.message;

    let sentmeta = document.createElement('div');
    sentmeta.classList.add('sentmeta');

    let sender = document.createElement('p');
    sender.classList.add('sender');
    sender.textContent = "You";

    let timestamp = document.createElement('p');
    timestamp.classList.add('timestamp');
    timestamp.textContent = message.added;

    // Components of RECEIVED Message

    let received = document.createElement('div');
    received.classList.add("received");

    let bubbleRec = document.createElement('div');
    bubbleRec.classList.add("bubble");

    let textRec = document.createElement('p');
    textRec.classList.add("text");
    textRec.textContent = message.message;

    let receivedmeta = document.createElement('div');
    receivedmeta.classList.add("receivedmeta");

    let senderRec = document.createElement('p');
    senderRec.classList.add("sender");
    senderRec.textContent = message.from;

    let timestampRec = document.createElement('p');
    timestampRec.classList.add("timestamp");

    let unix = Date.parse(message.added);
    let date = new Date(unix);
    timestampRec.textContent = message.added;

    let name = document.querySelector('#name');

    // console.log(name);
    // console.log(name.value === message.from)

    if (name.value === message.from){
            parent.appendChild(sent);
            totalMessages = totalMessages + 1;
            sent.appendChild(bubble);
            bubble.appendChild(text);  
            sent.appendChild(sentmeta);
            sentmeta.appendChild(senderRec);
            sentmeta.appendChild(timestamp);
          

    } else {
            parent.appendChild(received);
            totalMessages = totalMessages + 1;
            received.appendChild(receivedmeta);
            receivedmeta.appendChild(senderRec);
            receivedmeta.appendChild(timestampRec);
            received.appendChild(bubbleRec);
            bubbleRec.appendChild(textRec);
    }
}

window.addEventListener('load', function() {
getMessages();

let sendBtn = document.querySelector('#send');
sendBtn.addEventListener('click', function() {
    let name = document.querySelector('#name');
    let message = document.querySelector('#message');
    console.log(name.value);
    console.log(message.value);

    let request = new XMLHttpRequest();
    request.open('POST', 'https://tiy-28202.herokuapp.com/chats');

    request.addEventListener('load', function() {
        console.log('received response');

    })
    request.send(JSON.stringify({
        from: name.value,
        message: message.value,
    }));

})

let retrieve = document.querySelector('.ear button');
retrieve.addEventListener('click', function () {
        getMessages();
    });


})  