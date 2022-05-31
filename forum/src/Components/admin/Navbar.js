import { Navbar,Nav,Form,FormControl,Container,Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import "../../styles/navbar.css";
import { useState,useEffect } from "react";
import logo from "../../imgs/Reddit-Emblem.png";
import axios from "axios";
const AdminNav = () => {
  const [categories, setCategorie] = useState([]);
 const [ cat,setCat] = useState();
 const navigate = useNavigate();
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get("api/categories");
  //     setCategorie(res.data);
  //   };
  //   fetch();
  // }, []);

 const inputchangehandler = async (e) =>{
        setCat(e.target.value);
    }

  const logOut = () => {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("adminName");
    localStorage.removeItem("admin_id");
	}
  
  var sign = '';
  if(!localStorage.getItem('adminToken'))
  {
    sign = 
      <>
          <Nav.Link as={Link} to={"/Signup"} >
        <Button variant="danger">
            Signup 
        </Button>
        </Nav.Link>
         <Nav.Link as={Link} to={"/Signin"}>Signin</Nav.Link>
      </>
    
  }
  else{
    sign=<>
   <Nav.Link  as={Link} to={"/Signin"} >
        <Button variant="danger" onClick={logOut}>
            Logout
        </Button>
      </Nav.Link> 
    </>
  }

 


    return ( 
        <Navbar expand="lg" className="nav">
  <Container>
    <Navbar.Brand>
      <Link to="/home">
      <img className="logo" alt="" src={logo} />
      </Link>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto parent">
        {/* <Nav.Link as={Link} to={"/"}>Home</Nav.Link> */}
      </Nav>
           <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
         <Nav.Link as={Link} to={"/Users"}>Users</Nav.Link>
         
      {sign}
       
    </Navbar.Collapse>
  </Container>
</Navbar>
     );
}
 
export default AdminNav;