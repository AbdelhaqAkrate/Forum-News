import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import {Navigate} from "react-router-dom"
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home';
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
