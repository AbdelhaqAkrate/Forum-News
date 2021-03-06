import { Navbar,Nav,Form,FormControl,Container,Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import "../styles/navbar.css";
import { useState,useEffect } from "react";
import logo from "../imgs/Reddit-Emblem.png";
import axios from "axios";
const Navigation = () => {
  const [categories, setCategorie] = useState([]);
 const [ cat,setCat] = useState();
 const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("api/categories");
      setCategorie(res.data);
    };
    fetch();
  }, []);

 const inputchangehandler = async (e) =>{
        setCat(e.target.value);
    }

  const logOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
    localStorage.removeItem("user_id");
	}
  
  var sign = '';
  if(!localStorage.getItem('token'))
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
    <Nav.Link as={Link} to={"/Profile"}>Profile</Nav.Link>
   <Nav.Link  as={Link} to={"/Signin"} >
        <Button variant="danger" onClick={logOut}>
            Logout
        </Button>
      </Nav.Link> 
    </>
  }

   const Search=()=>{
      navigate('/Search',{state:{categorie:cat}});
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
       <Form className="d-flex" onSubmit={Search}>
         <Form.Select size="sm" aria-label="Default select example" name="cat" value={cat} onChange={inputchangehandler}>
                        <option>Select ...</option>
                    {categories.map(categorie => (
                        <option value={categorie.id} key={categorie.id} >{categorie.name}</option>
                     ))}
                    </Form.Select>
                    <span>   </span>
         <Button variant="outline-success" type="submit">Search</Button>
      </Form>
         
      {sign}
       
    </Navbar.Collapse>
  </Container>
</Navbar>
     );
}
 
export default Navigation;