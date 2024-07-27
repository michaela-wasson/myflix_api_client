import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import moment from 'moment';


export const ProfileEdit = () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(user.Username || "");
    console.log("username", username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email || "");
    console.log("email", email);
    const [birthday, setBirthday] = useState(user.Birthday || "");
    console.log("birthday", birthday)

    const date = new Date(user.Birthday);
    let formattedDate = moment(date).format('MMMM Do YYYY');
    

    useEffect(() => {

        
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                if (!response.ok) {
                    alert('Failed to fetch user data');
                }
                const userData = await response.json();
                setUsername(userData.Username);
                setEmail(userData.Email);
                setBirthday(userData.Birthday);
                
                
                
            } catch (err) {
                setError(err.message);
            } 
        };

       fetchUserData();

    }, [token, user.Username]);

    


    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            Username: username, 
            Email: email, 
            Birthday: birthday 
            //Password: password
        }; 
        
        console.log("updated user", updatedUser);
        
        try {
            const response = await fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser)
            });
            if (!response.ok) {

                throw new Error('Failed to update user data');

            }
            console.log("res", response);
            alert('User information updated successfully!');
            //window.location.reload(); 
            }
            
        catch (err) {
            alert(err.message);
        }

        setUsername(updatedUser.Username); 
        console.log(updatedUser.Username);
        setEmail(updatedUser.Email);
        setBirthday(updatedUser.Birthday);
        console.log(updatedUser.Birthday)


    };


    return (
        <div id= "formstyling">
            <h2>User Profile</h2>
            <ListGroup>
                <ListGroup.Item>Username: {username}</ListGroup.Item>
                <ListGroup.Item>Email: {email}</ListGroup.Item> 
                <ListGroup.Item >Birthday: {birthday}</ListGroup.Item>
            </ListGroup>

            <div class= "editprofile">
                <h2>Edit Profile</h2>

            

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder= "username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder = "Email"
                        onChange={(e) => setEmail(e.target.value )}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder= "Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        
                        onChange={(e) => setBirthday( e.target.value )}
                    />
                </Form.Group>

                <Button className = "btn-submit" variant="primary" type="submit">
                    Update Profile
                </Button>
            </Form>
            </div>
        </div>
    );
};
