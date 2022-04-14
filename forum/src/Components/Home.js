import "../styles/home.css";
import React from "react";
import { Container,Row,Col, Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCommentAlt } from "react-icons/fa";
import Navigation from './Navbar';
const Home = () => {
    return ( 
        <div className="home">
            <Navigation />
            <div className="container fluid page">
                       <div class="bg-light p-4">
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40"/><input class="form-control ml-1 shadow-none input" placeholder="Create Post"/></div>
                    
                </div>
                 <h2 className="titles">Tranding Of The Day</h2>
                <div className="trand">
    
                    <div className="topics">
                        <div className="card">
                            <img  src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} className="img"  alt="Hot Topics" />
                            <div className="detail">
                                <h3>Username</h3>
                                <p>this is the content</p>
                            </div>
                        </div>
                        <div className="card">
                        <img  src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} className="img"  alt="Hot Topics" />
                        <div className="detail">
                            <h3>Username</h3>

                        </div>
                        </div>
                    </div>
                </div>
                <div class="container mt-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-8">
            <div class="d-flex flex-column comment-section">
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40" />
                        <div class="d-flex flex-column justify-content-start ml-2">
                        <span class="d-block font-weight-bold name">Username</span><span class="date text-black-50">Time of posting</span></div>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text">what the post about slssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.</p>

                    </div>
                </div>
                <div class="bg-white">
                    <div class="d-flex flex-row fs-12">
                        <div class="like p-2 cursor"><button className="interaction"><FaCommentAlt/> Like</button></div>
                        <div class="like p-2 cursor"><button className="interaction"><span><svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"/></svg></span> Comment</button></div>
                    </div>
                </div>
                <div class="bg-light p-2">
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40"/><textarea class="form-control ml-1 shadow-none textarea"></textarea></div>
                    <div class="mt-2 text-right"><button class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button></div>
                </div>
            </div>
        </div>
    </div>
</div>
                
            </div>

          

        </div>
     );
}
 
export default Home;