import React from "react";
import {useState} from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        eventpreventDefault();

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
        }).then((response) => {
            if(response.ok) {
                onLoggedIn(username);
    
            } else {
                alert("Can't login");
            }
        });

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No such user");
          }
    };




    return (
      <form onSubmit= {handleSubmit}>
        <label>
          Username:
          <input type="text" 
          value={username} 
          onchange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Submit</button>
      </form>
    )};