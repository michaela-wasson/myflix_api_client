import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavBar = ({ user, onLoggedOut, emptySearch, handleInputChange, searchItem }) => {
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

            <>  <Nav.Item>
                    <Nav.Link as={Link} to="/users">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={onLoggedOut} >Logout</Nav.Link> 
                </Nav.Item>
                <Form className="me-auto">
                  <Form.Group controlId="searchBar">
                    <Form.Control
                      type="text"
                      value={searchItem}
                      onChange={handleInputChange}
                      placeholder="Search by title"
                    />
                  </Form.Group>
                </Form>  
                 
            </>
          ) : (
            <>  <Nav.Item>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                 </Nav.Item>
                 <Nav.Item>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                 </Nav.Item>
                
                
            </>
        )}
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};