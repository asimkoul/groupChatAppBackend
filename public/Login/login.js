async function login(event) {
    try {
        event.preventDefault()
        const loginDetails={
            email:event.target.email.value,
            password:event.target.password.value
        }    
        const response=await axios.post("http://localhost:3000/user/login",loginDetails)
        if (response.status===200) {
            alert(response.data.message)
            console.log(response.data);
            console.log(response.data.token);
            localStorage.setItem('token',response.data.token)
             window.location.href="../message/message.html"
        } 
    } catch (error) {
        console.log(error)
    }
}