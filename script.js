let nickname = '';
let participants = new Set();

function setNickname() {
    const nicknameInput = document.getElementById("nickname-input");
    nickname = nicknameInput.value.trim();

    if (nickname) {
        document.getElementById("nickname-modal").classList.add("hidden");
        document.getElementById("chat-box").classList.remove("hidden");

        addParticipant(nickname);
        displayNotification(`Вы вошли в чат как ${nickname}`);
    }
}

function addParticipant(name) {
    participants.add(name);
    updateParticipantsList();
}

function removeParticipant(name) {
    participants.delete(name);
    updateParticipantsList();
}

function updateParticipantsList() {
    const participantsDiv = document.getElementById("participants");
    participantsDiv.innerHTML = '<strong>Участники:</strong><br>' + Array.from(participants).join(', ');
}

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message) {
        displayMessage(nickname, message);
        messageInput.value = "";
    }
}

function displayMessage(user, message) {
    const chatLog = document.getElementById("chat-log");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Прокрутка вниз
}

function displayNotification(notification) {
    const chatLog = document.getElementById("chat-log");
    const notificationElement = document.createElement("div");
    notificationElement.classList.add("notification");
    notificationElement.textContent = notification;
    chatLog.appendChild(notificationElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Прокрутка вниз
}

// Обработчик закрытия окна (можно использовать для удаления участников)
window.addEventListener("beforeunload", () => {
    removeParticipant(nickname);
});
