const token = localStorage.getItem("token");
const socket = io({ auth: { token: token } });
socket.on("auth-error", () => {
  alert("Authentication error: You are not logged in!");
  window.location.href = "../Login/login.html";
});

document.getElementById("create-group-btn").addEventListener("click", () => {
    document.getElementById("createGroupDialog").classList.add("active");
});


document.getElementById("close").addEventListener("click", () => {
    document.getElementById("createGroupDialog").classList.remove("active");
});

document.getElementById("createGroupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        if (!token) {
            alert("You are not logged in!");
            document.location.href = "../Login/login.html";
            return;
        }
        const name = e.target.groupName.value;
        const members = e.target.membersInput.value;
        let membersArray = members.split(",");
        const group = {
            name: name,
            members: membersArray,
          };
          socket.emit("create-group", group);
        } catch (err) {
          console.error(err);
        }
      });
      
      socket.on("user-not-found", () => {
        alert("User not found!");
      });
      
      socket.on("group-created", () => {
        window.location.reload();
      });
      
      socket.emit("get-groups", async (groups) => {
        try {
          if (!token) {
            alert("You are not logged in!");
            document.location.href = "../Login/login.html";
          } else {
            const groupList = document.getElementById("group-list");
            groups.forEach((group) => {
              groupList.innerHTML += `<button type="button" id=${group.id} onclick="singleGroup(${group.id}, '${group.name}')">${group.name}</button>`;
            });
          }
    }
    catch (err) {
        alert(err.response.data.error);
        window.location.href = "../Login/login.html";    }
});

async function singleGroup(id, name) {
    try {
      if (!token) {
        alert("You are not logged in!");
        document.location.href = "../Login/login.html";
      } else {
        localStorage.setItem("groupId", id);
        localStorage.setItem("groupName", name);
        document.location.href = `../SingleGroup/singlegroup.html`;
      }
    } catch (err) {
        console.error(err);
      }
    }