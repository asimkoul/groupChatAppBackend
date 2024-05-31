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
    const pre = document.querySelector("pre");
    try {
        const response = await axios.get("http://localhost:3000/message/allMessages", { headers: { "Authorization": token } });
        const newMessages = response.data.message;
        if (!arraysEqual(previousMessages, newMessages)) {
            let content = '';
            const onlineUsersResponse = await axios.get("http://localhost:3000/user/online-users", { headers: { "Authorization": token } });
            const onlineUsers = onlineUsersResponse.data.message.map(user => `${user} joined`).join('\n');
            content += onlineUsers + '\n';
            newMessages.forEach((message) => {
                content += `${message.sender}: ${message.message}\n`;
            });
            pre.innerHTML = content;
            previousMessages = newMessages.slice();
        }
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
    //     const pre = document.querySelector("pre");
    //     pre.innerHTML = "";
    //     const onlineUsers = await axios.get("http://localhost:3000/user/online-users", { headers: { "Authorization": token } });
    //     console.log(onlineUsers.data.message)
    //     onlineUsers.data.message.forEach((user) => {
    //         pre.innerHTML += `${user} joined\n`;
    //     });
    //     const messages = await axios.get("http://localhost:3000/message/allMessages", { headers: { "Authorization": token } });
    //     messages.data.message.forEach((message) => {
    //         pre.innerHTML += `${message.sender}: ${message.message}\n`;
    //     });
    fetchAllMessages();
    setInterval(fetchAllMessages, 1000);

     }
    catch (err) {
        console.error(err);
    }
});