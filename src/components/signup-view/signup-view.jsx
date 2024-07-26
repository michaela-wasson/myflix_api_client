import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button"; 
import Form from 'react-bootstrap/Form';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
    };
  
    return ( 
        <Form id= "formstyling" onSubmit={handleSubmit}
        >
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            //class= "formstyling"
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

        <Form.Group controlId = "formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
            type = "email"
            value = {email}
            onChange ={(e) => setEmail(e.target.value)}
            required
            />
        </Form.Group>

        <Button className= "btn-submit" variant= "primary" type="submit">
            Submit
        </Button>
    </Form>


  )};


