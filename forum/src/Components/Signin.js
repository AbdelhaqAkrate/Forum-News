import "../styles/signin.css";
import React from "react";
import Navigation from './Navbar';
const Signin = () => {
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
                            <div class="input_text"> <input type="text" placeholder="Username" /> <i class="fa fa-user" ></i> </div>
                            <div class="input_text"> <input class="signin_pass" type="password" name="password" placeholder="Password" /> <i class="fa fa-lock"></i> <i class="fa fa-eye-slash"></i> </div>
                            <div class="login_btn"> <button class="login_button">LOGIN</button> </div>
                            <div class="create margin"> <a href="#" class="create_acc">Create your Account <i class="fa fa-long-arrow-right"></i></a> </div>
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