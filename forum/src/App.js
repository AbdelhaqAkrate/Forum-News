import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import {Navigate} from "react-router-dom"
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Search from './Components/Search';
import SigninAdmin from './Components/admin/SigninAdmin';
import SignupAdmin from './Components/admin/SignupAdmin';
import Users from './Components/admin/Users';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Signin/>} />
           <Route path="/home" element={<Home/>} />
           <Route path="/Signup" element={<Signup/>} />
           <Route path="/Profile" element={<Profile/>} />
           <Route path="/Search" element={<Search/>} />
           <Route path="/admin" element={<SigninAdmin/>} />
             <Route path="/newAdmin" element={<SignupAdmin/>} />
           <Route path="/Users" element={<Users/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
