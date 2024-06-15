async function signup(event){
    try {
        event.preventDefault()
        const signupDetails={
            name:event.target.name.value,
            email:event.target.email.value,
            password:event.target.password.value
        }
        const response=await axios.post("http://3.110.172.188:3000/user/signup",signupDetails)
        if(response.status===201){
            window.location.href="../Login/login.html"
        }
        else{
            throw new Error("Failed to login")
        }

    } catch (error) {
        document.body.innerHTML=`<div style="color:red;">${error} </div>`;
    }

}