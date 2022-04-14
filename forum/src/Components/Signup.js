import Navigation from "./Navbar";
import '../styles/signup.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const Signup = () => {
    return ( 
        <div>
            <Navigation/>
            <div class="register-photo">
                <div class="form-container">
                        <div class="image-holder"></div>
                        <form>
                            <h2 class="text-center"><strong>Create</strong> an account.</h2>
                            <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email" /></div>
                            <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password" /></div>
                            <div class="form-group"><input class="form-control" type="password" name="password-repeat" placeholder="Password (repeat)" /></div>
                            <div class="form-group"><button class="btn btn-primary btn-block">Sign Up</button></div><a class="already" href="#">You already have an account? Login here.</a>
                        </form>
                </div>
            </div>
        </div>
     );
}
 
export default Signup;