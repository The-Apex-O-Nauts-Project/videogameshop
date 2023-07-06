import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import {register} from "../axios-services"

function Register({setToken}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    async function handleSumbit(ev){
        ev.preventDefault()
        const user = {username, password}
        if(!username.trim()){
            alert("Please Enter a Username")
            return;
        }
        if(!email.trim()){
            alert("Please Enter a Email")
            return;
        }
        if(!password || password.length < 8){
            alert("Password is too short, it must be atleast 8 charaters")
            return;
        }
        const results = await register(user);
        console.log(results)

        if(results && results.token){
            const token = results.token;
            setToken(token)
            window.localStorage.setItem("token", token)
            
        }else{
            alert("There was an error registering")
            console.log("Register has Failed")
        }
    }
    return(
        <div>
            <h2>Register Here</h2>
            <form onSubmit={handleSumbit}>
                <input
                type="text"
                placeholder="Enter Username"
                onChange={(ev)=> setUsername(ev.target.value)}
                />
                <input
                type="password"
                placeholder="Enter Password"
                onChange={(ev)=> setPassword(ev.target.value)}
                />
                <input
                type="text"
                placeholder="Enter Email"
                onChange={(ev)=> setEmail(ev.target.value)}
                />
                <button type="sumbit">Register</button>
            </form>
        </div>
    )
}

export default Register