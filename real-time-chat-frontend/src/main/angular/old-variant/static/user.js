const HIDDEN_CLASS_NAME = 'hidden';
const registrationScreen = document.getElementById('registration-screen');
const messagesScreen = document.getElementById('messages-screen');

const sendUserRegistrationBtn = document.getElementById('send-username-btn');
const inputUserRegistration = document.getElementById('input-username');

checkUserRegistration();
function checkUserRegistration() {
    messagesScreen.classList.add(HIDDEN_CLASS_NAME);

    const user = getLocalStorageUser();

    if (user) {
        registrationScreen.classList.add(HIDDEN_CLASS_NAME);
        messagesScreen.classList.remove(HIDDEN_CLASS_NAME);
    }
}

function getLocalStorageUser() {
    return localStorage.getItem('user');
}

sendUserRegistrationBtn.addEventListener('click', function () {
    const username = inputUserRegistration.value;
    if (username.length > 0) {
        registrateUser(username)
            .then(setUserInLocalStorage)
            .then(checkUserRegistration)
            .catch(function(error) {
                console.log(error);
            });
    }
})

async function registrateUser(username) {
    const response = await fetch("http://localhost:28852/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username}),
    });

    if (!response.ok) {
        throw new Error(`Cannot registrate because of status ${response.status}.`)
    }

    return await response.json();
}

function setUserInLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

window.addEventListener("beforeunload", function () {
    localStorage.removeItem("user");
});