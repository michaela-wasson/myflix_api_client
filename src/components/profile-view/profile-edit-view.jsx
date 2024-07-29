import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import moment from 'moment';

export const ProfileEdit = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchedUser = JSON.parse(localStorage.getItem('user'));
        if (fetchedUser) {
            setUser(fetchedUser);
            setUsername(fetchedUser.Username);
            setEmail(fetchedUser.Email);
            setBirthday(fetchedUser.Birthday);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            Username: username,
            Email: email,
            Birthday: birthday,
            
        };

        console.log("updated user", updatedUser);

        try {
            const response = await fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            console.log("res", response);

            setUsername(updatedUser.Username);
            setEmail(updatedUser.Email);
            setBirthday(updatedUser.Birthday);

            const updateLocalStorage = (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

            alert('User information updated successfully!');


        } catch (err) {
            alert(err.message);
        }
    };





    //const formattedDate = moment(new Date(birthday)).format('YYYY-MM-DD');

    return (
        <div id="formstyling">
            <h2>User Profile</h2>
            <ListGroup>
                <ListGroup.Item>Username: {username}</ListGroup.Item>
                <ListGroup.Item>Email: {email}</ListGroup.Item>
                <ListGroup.Item>Birthday: {moment(birthday).format('MMMM Do YYYY')}</ListGroup.Item>
            </ListGroup>

            <div className="editprofile">
                <h2>Edit Profile</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="btn-submit" variant="primary" type="submit">
                        Update Profile
                    </Button>
                </Form>
            </div>
        </div>
    );
};
