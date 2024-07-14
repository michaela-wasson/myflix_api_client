import { useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import {ProfileEdit} from "/profile-edit-view";


export const ProfileView = ( { movies} )=> {
    const user = JSON.parse(localStorage.getItem('user')); 
    let favMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))
    // const favMovies = [];
    // for (let i = 0; i < movies.length; i++) {
    //     if (user.favoriteMovies.includes(movies[i]._id)){
    //         favMovies.push(movies[i])
    //         console.log(favMovies)
    //     }
    // } //movies.filter((movie) => user.favoriteMovies.includes(movie._id));

    return ( //user info 
        <Form>

        

            <ListGroup>
                <ListGroup.Item>Your Username: {user.Username}</ListGroup.Item>
                <ListGroup.Item>Your Email: {user.Email}</ListGroup.Item>
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
            <Link to={`/users/${encodeURIComponent(user.Username)}`}>
                <Button
                  type="button"
                >
                  Edit Profile
                </Button>
              </Link>
            </ListGroup.Item>

            <ListGroup.Item>
            <Link to={`/users/${encodeURIComponent(user.Username)}`}>
                <Button
                  type="button"
                >
                  Delete Profile
                </Button>
              </Link>
            </ListGroup.Item>

            </ListGroup>

        </Form> 

    );

    //form and button to update info 


    //button to delete user

    // fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/users", {
    //     method: "GET",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }).then((response) => {
    //     if (response.ok) {


    //     } else {
    //       alert("Signup failed");
    //     }
    //   });
    //   };


};
