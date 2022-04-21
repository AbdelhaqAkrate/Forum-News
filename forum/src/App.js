import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import {Navigate} from "react-router-dom"
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home';
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
          <Route path="/" element={<Home/>} />
           <Route path="/Signin" element={<Signin/>} />
           <Route path="/Signup" element={<Signup/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
