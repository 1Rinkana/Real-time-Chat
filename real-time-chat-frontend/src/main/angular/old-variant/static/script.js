const PUBLIC_CHAT = 'Public chat';
const CLICK_EVENT_TYPE = 'click';

const sendMsgBtn = document.getElementById('send-msg-btn');
const inputMsg = document.getElementById('input-msg');
const messagesArea = document.getElementById('messages');
const usersList = document.getElementById('users');
const publicChatBtn = document.getElementById('public-chat-btn');
const chatWith = document.getElementById('chat-with');

let stompClient = null;
const clientId = crypto.randomUUID();

// BUTTONS LISTENERS
sendMsgBtn.addEventListener(CLICK_EVENT_TYPE, function () {
    const message = inputMsg.value;
    if (message.length > 0) {
        sendMessage(message);
    }
})

publicChatBtn.addEventListener(CLICK_EVENT_TYPE, function () {
    updateSelectedElement(publicChatBtn);
    selectChat(PUBLIC_CHAT);

    if (stompClient !== null) {
        sendOpenPublicChatRequest()
    }
})

// If hidden class will be removed -> connectToChat.
const observer = new MutationObserver(() => {
    if (!messagesScreen.classList.contains("hidden")) {
        connectToChat();
        observer.disconnect();
    }
});

observer.observe(messagesScreen, {
    attributes: true,
    attributeFilter: ["class"]
});

window.addEventListener("beforeunload", function () {
    stompClient._disconnect();
});

function connectToChat() {
    if (stompClient !== null) {
        return;
    }

    const user = getLocalStorageUser();

    const socket = new SockJS('http://localhost:28852/messages-websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect( {
        'user-uuid': user.uuid,
        'client-uuid': clientId,
    }, function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/chat/users', processUserStateChange);

        stompClient.subscribe('/chat/public/new-message', processNewPublicMessages);

        stompClient.subscribe(`/chat/public/history/client/${clientId}`, processPublicChatHistory);

        stompClient.subscribe(`/chat/public/messages/client/${clientId}`, processChatMessages);

        stompClient.subscribe(`/chat/private/client/${clientId}`, processPrivateMessage);

        stompClient.subscribe(`/chat/private/messages/client/${clientId}`, processChatMessages);

        sendJoinRequest();

    }, function (error) {
        console.error("STOMP error:", error);
    });
}

// MESSAGES PROCESSING

function processUserStateChange(response) {
    const userState = JSON.parse(response.body);
    changeUserState(userState);
}

function processNewPublicMessages(response) {
    if (publicChatBtn.classList.contains('selected')) {
        showMessage(JSON.parse(response.body));
    }
}

function processPublicChatHistory(response) {
    const user = getLocalStorageUser();
    const joinResponseBean = JSON.parse(response.body);

    joinResponseBean.messages.forEach(showMessage);
    joinResponseBean.onlineUsers
        .filter(onlineUser => onlineUser.uuid !== user.uuid)
        .forEach(showUser);
}

function processChatMessages(response) {
    const messages = JSON.parse(response.body);
    messages.forEach(showMessage);
}

function processPrivateMessage(response) {
    const messageWithAddress = JSON.parse(response.body);
    const message = messageWithAddress.message;

    const selectedElements = document.getElementsByClassName('selected');
    const selectedElement = selectedElements.item(0);

    if (selectedElement.id === message.sentByUser.uuid || selectedElement.id === messageWithAddress.sentTo) {
        const userContainerElement = document.getElementById(selectedElement.id);
        setUserElementAsFirstInList(userContainerElement);
        showMessage(message);
    } else {
        const userContainerElement = document.getElementById(message.sentByUser.uuid);
        const usersNewMessageCounter = userContainerElement.getElementsByClassName('new-message-counter').item(0);
        usersNewMessageCounter.classList.remove('hidden');
        usersNewMessageCounter.textContent = String(Number(usersNewMessageCounter.textContent) + 1);
        setUserElementAsFirstInList(userContainerElement);
    }
}

// REQUESTS

function sendMessage(message) {
    const user = getLocalStorageUser();
    let requestBody;
    const selectedElements = document.getElementsByClassName('selected');
    const selectedElement = selectedElements.item(0);
    if (selectedElement && selectedElement.innerText !== PUBLIC_CHAT) {
        requestBody = JSON.stringify({
            text: message,
            sentByUser: user.uuid,
            isPublic: false,
            sendToUser: selectedElement.id
        });
    } else {
        requestBody = JSON.stringify({
            text: message,
            sentByUser: user.uuid,
            isPublic: true,
        });
    }

    stompClient.send('/app/new-message', {}, requestBody);
}

function sendJoinRequest() {
    const requestBody = JSON.stringify({clientId: clientId});
    stompClient.send("/app/join", {}, requestBody);
}

function sendOpenPrivateChatRequest(user) {
    stompClient.send(
        "/app/chat/private",
        {},
        JSON.stringify({
            askedUser: getLocalStorageUser().uuid,
            chatWithUser: user.uuid
        })
    );
}

function sendOpenPublicChatRequest() {
    const requestBody = JSON.stringify({clientId: clientId});
    stompClient.send('/app/chat/public', {}, requestBody);
}

// DYNAMIC ELEMENTS
function showMessage(message) {
    const text = message.text;
    const sender = message.sentByUser.username;
    const date = message.sentAt;

    const newMessage = document.createElement("div");
    newMessage.classList.add("message-container");

    const newMessageSender = document.createElement("div");
    newMessageSender.textContent = sender;
    newMessageSender.classList.add("sender");
    newMessage.appendChild(newMessageSender);

    const newMessageDate = document.createElement("div");
    newMessageDate.textContent = parseDate(date);
    newMessageDate.classList.add("date");
    newMessage.appendChild(newMessageDate);

    const newMessageText = document.createElement("div");
    newMessageText.textContent = text;
    newMessageText.classList.add("message");
    newMessage.appendChild(newMessageText);

    inputMsg.value = '';
    messagesArea.appendChild(newMessage);
    newMessage.scrollIntoView(true);
}

function showUser(user) {
    if (user.uuid === getLocalStorageUser().uuid) {
        return;
    }

    if (document.getElementById(user.uuid)) {
        return;
    }

    const userContainerElement = document.createElement("div");
    userContainerElement.id = user.uuid;
    userContainerElement.classList.add("chat-btn", "user-container");

    const userElement = document.createElement("p");
    userElement.textContent = user.username;
    userElement.classList.add("user");
    userContainerElement.appendChild(userElement);

    const newMessageCounter = document.createElement("p");
    newMessageCounter.textContent = '0';
    newMessageCounter.classList.add("new-message-counter", 'hidden');
    userContainerElement.appendChild(newMessageCounter);

    userContainerElement.classList.add("chat-btn", "user-container");

    userContainerElement.addEventListener(CLICK_EVENT_TYPE, () => {
        removeSelectedClasses();
        addSelectedClass(userContainerElement);
        openPrivateChat(user);
    });

    usersList.appendChild(userContainerElement);
}

function openPrivateChat(user) {
    const userContainerElement = document.getElementById(user.uuid);

    if (userContainerElement) {
        const usersNewMessageCounter = userContainerElement.querySelector('.new-message-counter');

        if (usersNewMessageCounter) {
            usersNewMessageCounter.classList.add('hidden');
            usersNewMessageCounter.textContent = '0';
        }
    }

    selectChat(user.username);

    sendOpenPrivateChatRequest(user);
}

function changeUserState(statusUpdate) {
    const uuid = statusUpdate.user.uuid;

    if (uuid === getLocalStorageUser().uuid) {
        return;
    }

    if (statusUpdate.type === "OFFLINE") {
        const userElement = document.getElementById(uuid);

        if (userElement) {
            userElement.remove();
        }
    }

    if (statusUpdate.type === "ONLINE") {
        if (document.getElementById(uuid)) {
            return;
        }
        showUser(statusUpdate.user);
    }
}

// CHAT SELECTION
function removeSelectedClasses() {
    document.querySelectorAll('.selected').forEach(chatBtn => {
        chatBtn.classList.remove('selected');
    });
}

function addSelectedClass(element) {
    element.classList.add('selected');
}

function updateSelectedElement(element) {
    removeSelectedClasses();
    addSelectedClass(element);
}

function selectChat(chatName) {
    chatWith.innerText = chatName;
    messagesArea.innerHTML = '';
}

// MESSAGES PROCESSING
function setUserElementAsFirstInList(userContainerElement) {
    usersList.removeChild(userContainerElement);
    usersList.prepend(userContainerElement);
}

// EXTRA FUNCTIONS
function getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function parseDate(date) {
    return `${new Date(date).toLocaleDateString("en-US")} ${new Date(date).toLocaleTimeString("en-US")}`;
}