import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as= {Link} to="/"> 
          Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {user ? (
            
            <>
                <Link as={Link} to="/users">Profile</Link>
                <Link onClick={onLoggedOut} >Logout</Link>  
            </>
          ) : (
            <>
                <Link as={Link} to="/login">Login</Link>
                <Link as={Link} to="/signup">Signup</Link>
            </>
        )}
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};