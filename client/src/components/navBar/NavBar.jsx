import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';


export default function NavBar() {
  const { isAuthenticated, username } = useContext(AuthContext)
  return (
    <Navbar sticky='top' bg='4A5B72' expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/'} >HOME</Nav.Link>
            <Nav.Link as={Link} to={'/about'} >ABOUT</Nav.Link>
            <Nav.Link as={Link} to={'/blog'} >BLOG</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to={'/trips'} >MY TRIPS</Nav.Link>
                <Nav.Link as={Link} to={'/sharedTrips'} >SHARED TRIPS</Nav.Link>
                <Nav.Link as={Link} to={'/logout'} >LOG OUT</Nav.Link>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to={'/login'} >LOGIN</Nav.Link>
                <Nav.Link as={Link} to={'/register'} >REGISTER</Nav.Link>
              </>


            )}
          </Nav>
          
          <Nav className="ml-auto">
            {isAuthenticated && <Navbar.Text style={{ color: 'white' }}> Logged in as {username}</Navbar.Text >}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
