const form = document.querySelector("form");
const token = localStorage.getItem("token");

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
        const pre = document.querySelector("pre");
        pre.innerHTML = "";
        const onlineUsers = await axios.get("http://localhost:3000/user/online-users", { headers: { "Authorization": token } });
        console.log(onlineUsers.data.message)
        onlineUsers.data.message.forEach((user) => {
            pre.innerHTML += `${user} joined\n`;
        });
        // const messages = await axios.get("http://localhost:3000/all", { headers: { "Authorization": token } });
        // messages.data.message.forEach((message) => {
        //     pre.innerHTML += `${message.sender}: ${message.message}\n`;
        // });
    }
    catch (err) {
        console.error(err);
    }
});