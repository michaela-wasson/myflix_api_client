import React from "react";
import {useState} from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            access: username, 
            secret: password
        }; 

        fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
    
            } else {
                throw new Error("Can't login");
            }
        })
        .then((data) => {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        })
        .catch((error) => {
            alert(error.message);
        })

    };




    return (
      <form onSubmit= {handleSubmit}>
        <label>
          Username:
          <input type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
          />

        </label>

        <label>
          Password:
          <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>
        </label>
        <button type="submit" >Submit</button>
      </form>
    )};