Essential Views & Features:
Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view
Page 2
Single Movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites
Login view
● Allows users to log in with a username and password
Signup view
● Allows new users to register (username, password, email, date of birth)
Profile view
● Displays user registration details
● Allows users to update their info (username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to deregister

How the app is built
● a single-page application (SPA)
● state routing to navigate between views and share URLs
● Parcel as its build tool
●  written using the React library and in ES2015+
●  Bootstrap as a UI library for styling and responsiveness
●   hosted online using Netlify


Documentation: 
URL endpoints
What the Data Returns	URL endpoint	Method type	Query parameters	Format of data in request	Format of data in response
Return a list of ALL movies to the user	/movies	GET	None	None	a JSON object holding data about all movies
Return data (description, genre, director, image URL, whether it is featured or not) about a single movie by title to the user	/movies/[title]	GET	one movie title	none	A JSON object holding data about a movie, containing genre, director, image URL, feature: example [ movie title: Spain description: a terrible movie where the dog dies genre: horror director: Fernidad image: dog.jpeg featured: false]
Return data about a genre (description) by name/title (e.g., “Thriller”)	/movies/genre/[name]	GET	genre name	none	return JSON objects of all movies that include the genre
Return data about a director (bio, birth year, death year) by name	/movies/directors/[director]	GET	one director	none since its defined in the url	A JSON object holding data about a director	
Allow new users to register	/users	POST	one user	A JSON object including the users' registration data: name, password, email	message: You're registered!
Allow users to update their user info (username, password, email, date of birth)	/users/[Username]	PUT	none since its defined in the url	A JSON object including the type of data to update and the updated data	message: [type of info] updated
Allow users to add a movie to their list of favorites	/users/[Username]/[MovieID]	POST	movie they want to update	A JSON object including the movie they want to add	message: [movie name] added to your list of favorites
Allow users to remove a movie from their list of favorites	/users/[username]/movies/[MovieID]	DELETE	name of movie they want to delete	None	message: [movie name] deleted
Allow existing users to deregister	/users/[Username]	DELETE	none since its included in the url	none	message: your account is deleted
