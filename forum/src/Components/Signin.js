import "../styles/signin.css";
import React,{useState} from "react";
import Navigation from './Navbar';
import {Link} from 'react-router-dom';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Signin = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        name:'',
        email:'',
        messages:[],
        error:''
    });
      const handleInput = (e) =>{
        setData({...data,[e.target.name]: e.target.value});
    }

    const login = (e) =>{
        e.preventDefault();

        const inputs ={
            email: data.email,
            password : data.password,
        }
          axios.post(`/api/login`,inputs)
        .then(res =>{
                if(res.data.status === 200)
                {
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('user_id',res.data.user_id)
                    localStorage.setItem('username',res.data.username);
                    navigate('/');
                }
                 if(res.data.status === 401)
                {
                    setData({...data,error:res.data.message});
                }
                else{
                    setData({...data,messages: res.data['error']});
                   
                }
        });
    }

    return ( 
        <div>
            <Navigation />
            <div class="containe">
                <div class="card">
                <div class="form">
                    <div class="left-side"> <span></span> <span></span> <span></span> <span></span> </div>
                    <div class="right-side">
                        <div class="signin_form s_form ">
                            <div class="login">
                                <h2>User Login</h2>
                               
                            </div>
                             <div className="error">{data.error}</div>
                             <form onSubmit={login}>
                            <div class="input_text"> <input type="email" placeholder="email" name="email" onChange={handleInput} value={data.email} /> <span>{data.messages.email}</span></div>
                            <div class="input_text"> <input class="signin_pass" type="password" name="password" placeholder="Password" onChange={handleInput} value={data.password} /> <i class="fa fa-lock"></i> <i class="fa fa-eye-slash"></i><span>{data.messages.password}</span> </div>
                            <div class="login_btn"> <button class="login_button">LOGIN</button> </div>
                           </form>
                        </div>
                        <div class="signup_form s_form d-none">
                            <div class="login">
                                <h2>Create Account</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default Signin;