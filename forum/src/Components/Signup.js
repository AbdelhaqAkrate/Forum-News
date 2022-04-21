import Navigation from "./Navbar";
import '../styles/signup.css';
import React,{useState} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
const Signup = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        messages:[]
    });
    const handleInput = (e) =>{
        setData({...data,[e.target.name]: e.target.value});
    }
    const register = (e) => {
        e.preventDefault();

        const inputs ={
            name: data.name,
            email: data.email,
            password : data.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response =>{
        axios.post(`/api/register`,inputs)
        .then(res =>{
                if(res.data.status === 200)
                {
                    swal("Success",res.data.message)
                    navigate('/Signin');
                }
                else{
                    setData({...data,messages: res.data['error']});
                    console.log(data.messages)
                }
        });
        });
    }
    return ( 
        <div>
            <Navigation/>
            <div class="register-photo">
                <div class="form-container">
                        <div class="image-holder"></div>
                        <form onSubmit={register}>
                            <h2 class="text-center"><strong>Create</strong> an account.</h2>
                            <div class="form-group"><input class="form-control" type="text" name="name" placeholder="Name" onChange={handleInput} value={data.name} /><span>{data.messages.name}</span></div>
                            <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email" onChange={handleInput} value={data.email} /><span>{data.messages.email}</span></div>
                            <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password" onChange={handleInput} value={data.password} /><span>{data.messages.password}</span></div>
                            <div class="form-group"><button class="btn btn-primary btn-block">Sign Up</button></div>
                            <a class="already" href="#">You already have an account? Login here.</a>
                        </form>
                </div>
            </div>
        </div>
     );
}
 
export default Signup;