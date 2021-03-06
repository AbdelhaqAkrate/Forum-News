import "../styles/home.css";
import React,{useEffect,useState} from "react";
import { Container,Row,Col, Modal,Button, FormText } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCommentAlt } from "react-icons/fa";
import Signin from "./Signin";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import Navigation from './Navbar';
import AdminNav from "./admin/Navbar";
import CreatePost from "./Modal";
import UpdatePost from "./ModalEd";
import axios from "axios";
import { createBrowserHistory } from "history";

const Home = () => {
    const [dataFetch, setDataFetch] = useState({ post: [], trend: [], comment: [] });
    const history = createBrowserHistory();
  const [trends, setTrends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [com, setCom] = useState([]);
  const [Data, setData] = useState([]);
   const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
    const [showup, setShowup] = useState(false);
const handleShow = () =>setShow(true);
const handleClose = () =>setShow(false)

const handleShowup = () =>setShowup(true);
const handleCloseup = () =>setShowup(false);

 const inputchangehandler = (event) => {
    setCom(event.target.value)
  }

  function fetch()
  {
        const postData =  axios.get("api/posts");   
        const trendData = axios.get("api/trend");
        const commentData = axios.get("api/comments");
        axios.all([postData, trendData, commentData]).then(axios.spread((...responses) => {
  const responseOne = responses[0]
  const responseTwo = responses[1]
  const responseThree = responses[2]
 setDataFetch({ post: responseOne.data, trend: responseTwo.data, comment: responseThree.data })
}))
      
  }


  useEffect(()=>{
    //   fetchPosts();
      fetch();
       const interval=setInterval(()=>{
      fetch();
     },4000)
       return()=>clearInterval(interval)
  }, [dataFetch]);















      function publieWhen(time) {

        var dateNow = new Date();
      const createdAt = new Date(time)
      const created=  new Date(dateNow -createdAt)

  let seconds = (created / 1000).toFixed(1);
  let minutes = (created / (1000 * 60)).toFixed(1);
  let hours = (created / (1000 * 60 * 60)).toFixed(1);
  let days = (created / (1000 * 60 * 60 * 24)).toFixed();
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days"
}

const addComment =(id)=>{
    const dataForm = new FormData();
         dataForm.append('body',com);
         dataForm.append('post_id',id);
         dataForm.append('user_id',localStorage['user_id']);
         axios.post(`/api/comment`,dataForm)
        .then(res =>{
                if(res.data.status === 200)
                {
        
                   
                }
                else{
                   
                }
        });

}   
  

 const Like = (id,like) => {
        const dataForm = new FormData();
        const likes = like + 1;
         dataForm.append('likes',likes);
    
         axios.post(`api/Like/${id}`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                  
                }
        });
    
   
    }
    const DisLike = (id,dislike) => {
        const dataForm = new FormData();
        const dislikes = dislike + 1;
         dataForm.append('dislikes',dislikes);
         axios.post(`api/DisLike/${id}`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                  console.log(res)
                }
        });
        
   
    }

  const Get = (id,handle) =>
    {
      
        axios.get(`/api/post/${id}`)
        .then(result=>
            {
                 
            setData(result.data) 
            })
            .catch(err =>{
                console.log(err)
            })
  
    }
      const Delete = (id) =>
    {
      
        axios.get(`/api/DeletePost/${id}`)
        .then(result=>
            {
                 
            setData(result.data) 
            })
            .catch(err =>{
                console.log(err)
            })
  
    }
       const DeleteComment = (id) =>
    {
      
        axios.get(`/api/DeleteComment/${id}`)
        .then(result=>
            {
                 
            setData(result.data) 
            })
            .catch(err =>{
                console.log(err)
            })
  
    }
 
if(typeof localStorage["token"] !== 'undefined' || typeof localStorage["adminToken"] !== 'undefined')
{
    return ( 
        <div className="home">
            <Modal show={show}>
        <Modal.Header>
            <Modal.Title>
                Create Post
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreatePost />  
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showup}>
        <Modal.Header>
            <Modal.Title>
                Update Post
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <UpdatePost Data={Data} />  
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseup}>Cancel</Button>
        </Modal.Footer>
      </Modal>


        { (typeof localStorage["token"] !== 'undefined' && typeof localStorage["adminToken"] == 'undefined') &&

            <Navigation /> 
        }  
          { (typeof localStorage["token"] === 'undefined' && typeof localStorage["adminToken"] != 'undefined') &&

            <AdminNav /> 
        }  

            <div className="container fluid page">
                       <div class="bg-light p-4">
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40"/><input onClick={handleShow} class="form-control ml-1 shadow-none input" placeholder="Create Post"/></div>
                    
                </div>
                 <h2 className="titles">Trending Of The Day</h2>
                <div className="trand">
    
                    <div className="topics">
                         {dataFetch.trend.map(trend=>(
                        <div className="card">
                        { trend.image ===null ?  <img  src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} className="img"  alt="Hot Topics" /> : <img  src={'http://localhost/Forum/Api/storage/app/public/'+trend.image} className="img"  alt="Hot Topics" />} 
                            <div className="detail">
                                <h3>{trend.user.name}</h3>
                                <p>{trend.Content}</p>
                            </div>
                        </div>))}
                    </div>
                </div>
                <div class="container mt-5">
    <div class="d-flex justify-content-center row" >
 {dataFetch.post.map(post=>(
        <div class="col-md-8" key={post.id}>
            <div class="d-flex flex-column comment-section">
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40" />
                        <div class="d-flex flex-column justify-content-start ml-2  w-100">
                        <span class="d-block font-weight-bold name">{post.user.name}</span><span class="date text-black-50">{publieWhen(post.created_at)}</span>
                         { (localStorage['user_id'] == post.user.id || typeof localStorage["adminToken"] !== 'undefined') &&
                        <div class="edit">
                        <div className="edit"><button className="btn btn-light" onClick={()=>{ Get(post.id,handleShowup);handleShowup();}}>edit</button></div>
                        <div className="edit"><button className="btn btn-light" onClick={()=>Delete(post.id)}>Delete</button></div>
                        </div>
                            }
                        </div>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text">{post.Content}</p>
                    {/* { post.image !==null ? <center> <img src={post.image} alt="" width="50%" height="auto" /></center> : null } */}
                    { post.image !==null ? <center> <img src={'http://localhost/Forum/Api/storage/app/public/'+post.image} alt="" width="50%" height="auto" /></center> : null }
                    {/* <img src={require(`../../../Api/storage/app/public/${post.image}`)} alt="" width="50%" height="auto" /> */}
                    </div>
                     {/* <div class="aff_comment mt-5 mb-5 p-5">
                         <p><span class="fw-bolder fs-5">username </span> content</p>
                    </div> */}
                    
                </div>
                <div class="bg-white">
                    <div class="d-flex flex-row fs-12">
                        <div class="like p-2 cursor">{post.likes}<button onClick={()=>Like(post.id,post.likes)} className="interaction"> <BiLike/> </button></div>
                         <div class="like p-2 cursor">{post.dislikes}<button onClick={()=>DisLike(post.id,post.dislikes)} className="interaction"> <BiDislike/> </button></div>
                        {/* <div class="like p-2 cursor"><button className="interaction"><span><svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"/></svg></span> Comment</button></div> */}
                    </div>
                </div>




                     {dataFetch.comment.map(comm=>(
                         <div key={comm.id}>
                         { comm.post_id === post.id &&
                    <div className="comments p-3">
                        <div class="bg-light p-2 border">
                            <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40"/>
                            <span class="d-block font-weight-bold name">{comm.user.name}</span>
                            </div>
                            <span class=" d-block p-3 ml-3">{comm.body}</span>
                             { (comm.user_id == localStorage['user_id'] || localStorage['user_id'] == post.user.id || typeof localStorage["adminToken"] !== 'undefined') &&
                             <div className="edit"><button className="btn btn-light" onClick={()=>DeleteComment(comm.id)}>Delete</button></div>
                             }
                        </div>
                    </div>
                   }</div>))}



                <div class="bg-light p-2">
            
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40"/>
                    <textarea class="form-control ml-1 shadow-none textarea" name={post.id}
                    id={post.id} 
                    value ={com[post.id]}
                    onChange={inputchangehandler}
                    ></textarea></div>
                   { typeof localStorage["user_id"] !== 'undefined' ?
                    <div class="mt-2 text-right"><Button onClick={()=>addComment(post.id)} class="btn btn-primary btn-sm shadow-none">Post comment</Button></div>
                    :
                    <div class="mt-2 text-right"><Button onClick={()=>addComment(post.id)} class="btn btn-primary btn-sm shadow-none disabled important">Post comment</Button></div>
                    }
                    
                </div>
            </div>
        </div>))}


        





    </div>
</div>
                
            </div>

          

        </div>
     );
        }else{
   history.push('/');
   	localStorage.removeItem("token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("username");
   return(
     <Signin />
   )
}
}
 
export default Home;