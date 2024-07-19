import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";


export const ProfileEdit = () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(user.username || "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email || "");
    const [birthday, setBirthday] = useState(user.birthday || "");
    

    useEffect(() => {

        
        const fetchUserData = async () => {
            try {
                const response = await fetch('/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                if (!response.ok) {
                    alert('Failed to fetch user data');
                }
                const data = await response.json();
                
                setUser(data);
                
            } catch (err) {
                setError(err.message);
            } 
        };

        fetchUserData();
    }, []);

    
    console.log(user);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        
        try {
            const response = await fetch('/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                alert('Failed to update user data');
            }
            alert('User information updated successfully!');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <ListGroup>
                <ListGroup.Item>Username: {user.Username}</ListGroup.Item>
                <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                <ListGroup.Item>Password: {user.Password}</ListGroup.Item>
                <ListGroup.Item>Birthday: {user.Birthday}</ListGroup.Item>
            </ListGroup>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.Username}
                        onChange={(e) => setUsername({ ...user, Username: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={user.Email}
                        onChange={(e) => setEmail({ ...user, Email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={user.Password}
                        onChange={(e) => setPassword({ ...user, Password: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        value={user.Birthday}
                        onChange={(e) => setBirthday({ ...user, Birthday: e.target.value })}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Profile
                </Button>
            </Form>
        </div>
    );
};
