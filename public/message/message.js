const form = document.querySelector("form");
const token = localStorage.getItem("token");

let previousMessages = [];

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

async function fetchAllMessages() {
    const onlineUsersList = document.getElementById("online-users");
    const messagesList = document.getElementById("all-messages");
    try {
        const p1 = await axios.get("http://localhost:3000/message/allMessages", { headers: { "Authorization": token } });
        const p2 = await axios.get("http://localhost:3000/user/online-users", { headers: { "Authorization": token } });
        const [allMessagesResponse, onlineUsersResponse] = await Promise.all([p1, p2]);
        const newMessages = allMessagesResponse.data.message;
        const onlineUsers = onlineUsersResponse.data.message.map(user => `${user} joined`).join('\n');
        onlineUsersList.textContent = onlineUsers;
        const storedMessages = localStorage.getItem("messages");
        const allMessages = [...newMessages];
        const last10Messages = allMessages.slice(-10);
        let messageContent = '';
        if (storedMessages) {
            JSON.parse(storedMessages).forEach((message) => {
                messageContent += `${message.sender}: ${message.message}\n`;
            });
        }
        else {
            last10Messages.forEach((message) => {
                messageContent += `${message.sender}: ${message.message}\n`;
            });
        }
        messagesList.textContent = messageContent;
        localStorage.setItem("messages", JSON.stringify(last10Messages));

    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}


form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        const message = e.target.message.value;
        await axios.post("http://localhost:3000/message/", { message }, { headers: { "Authorization": token } });
        document.location.reload();
    }

    catch (err) {
        console.error(err);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (!token) {
            alert("You are not logged in!");
            document.location.href = "login.html";
        };
    fetchAllMessages();
    setInterval(fetchAllMessages, 1000);
     }
    catch (err) {
        console.error(err);
    }
});