import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button"; 
import Form from "react-bootstrap/Form";


export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username, 
            Password: password
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
                alert("Can't login");
            }
        })
        .then((data) => {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        })


    };

    return (
      <Form id= "formstyling" onSubmit= {handleSubmit}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type= "text"
            value={username}
            onChange= {(e) => setUsername(e.target.value)}
            required
            />
        </Form.Group>

        <Form.Group controlId= "formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
            type= "password"
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </Form.Group>

        <Button className= "btn-submit" variant= "primary" type="submit">
            Submit
        </Button>
    </Form>
    )
};