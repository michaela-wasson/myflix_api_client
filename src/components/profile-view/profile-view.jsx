import { useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import {ProfileEdit} from "./profile-edit-view";


export const ProfileView = ( { movies} )=> {
    const user = JSON.parse(localStorage.getItem('user')); 
    const token = JSON.parse(localStorage.getItem('token')); 
    const favMovies = (movies || []).filter(m => (user.FavoriteMovies || []).includes(m._id))

    const deleteProfile = async (user) => {
        await fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            }, 

          }).then((response) => {
            if (response.ok) {
              alert("This button will delete your info!");
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.reload();
            } else {
              alert("Try again");
            }
          }); 
          deleteProfile();
          };

         
    
   

    return ( 
        <Form>

        

            <ListGroup>
                <ListGroup.Item>Your Username: {user.Username}</ListGroup.Item>
                <ListGroup.Item>Your Email: {user.Email}</ListGroup.Item>
                <ListGroup.Item>Your Birthday: {user.Birthday}</ListGroup.Item>
                <ListGroup.Item>
                    <strong> Your Favorites!</strong>
                    {favMovies.length > 0 ? (
                        <ListGroup>
                            {favMovies.map((movie) => (
                                <ListGroup.Item key= {movie._id}>
                                    <MovieCard movie= {movie}/>
                                </ListGroup.Item>
                            ))}
                      
                        </ListGroup>
                        
                    ): (
                        <div>No favs</div>
                    )}
                </ListGroup.Item> 
            
            <ListGroup.Item>
            <Link to = "ProfileEdit" >
                <Button
                  type="button"
                >
                  Edit Profile
                </Button>
              </Link>
            </ListGroup.Item>

            <ListGroup.Item>
            
                <Button
                  type="button"
                  onClick= {deleteProfile}
                >
                  Delete Profile
                </Button>
              
            </ListGroup.Item>

            </ListGroup>

        </Form> 

    );



};
