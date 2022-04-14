import { Navbar,Nav,Form,FormControl,Container,Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/navbar.css";
import logo from "../imgs/Reddit-Emblem.png";
const Navigation = () => {
    return ( 
        <Navbar expand="lg" className="nav">
  <Container>
    <Navbar.Brand>
      <Link to="/">
      <img className="logo" alt="" src={logo} />
      </Link>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto parent">
        {/* <Nav.Link as={Link} to={"/"}>Home</Nav.Link> */}
      </Nav>
       <Form className="d-flex" >
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
         <Button variant="outline-success">Search</Button>
      </Form>
      <Nav.Link as={Link} to={"/Signup"} >
        <Button variant="danger">
            Signup 
        </Button>
      </Nav.Link>
         <Nav.Link as={Link} to={"/Signin"}>Signin</Nav.Link>
    </Navbar.Collapse>
  </Container>
</Navbar>
     );
}
 
export default Navigation;