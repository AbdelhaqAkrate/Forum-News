import {useLocation} from 'react-router-dom';
import "../styles/home.css";
import React,{useEffect,useState} from "react";
import { Container,Row,Col, Modal,Button, FormText } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCommentAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import Navigation from './Navbar';
import Signin from './Signin';
import CreatePost from "./Modal";
import UpdatePost from "./ModalEd";
import axios from "axios";
import { createBrowserHistory } from "history";
const SearchPage = () => {
const location = useLocation();
 
const history = createBrowserHistory();
  const [posts, setPosts] = useState([]);
  const [com, setCom] = useState([]);
  const [Data, setData] = useState([]);
  const [length, setLength] = useState([]);
   const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
    const [showup, setShowup] = useState(false);
const handleShow = () =>setShow(true);
const handleClose = () =>setShow(false)

const handleShowup = () =>setShowup(true);
const handleCloseup = () =>setShowup(false);
  const [dataFetch, setDataFetch] = useState({ post: [], comment: [] ,length: null});
 const inputchangehandler = (event) => {
    setCom(event.target.value)
  }

//     useEffect(() => {
//       const arr=[];
//     const fetch =  () => {
//       const res =  axios.get(`api/Search/${location.state.categorie}`);
//       setPosts(res.data);
//       setLength(res.data.length)
//       for(const key of this.posts)
//            {arr.push(key.id)}   
//         setCom(arr);

//     };
//     fetch();
//   }, []);
//   console.log(length)
//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get("api/comments");
//       setComments(res.data);
//     };
//     fetch();
//   }, []);

  function fetch()
  {
        const postData =  axios.get(`api/Search/${location.state.categorie}`); 
        const commentData = axios.get("api/comments");
        axios.all([postData, commentData]).then(axios.spread((...responses) => {
  const responseOne = responses[0]
  const responseTwo = responses[1]
            
 setDataFetch({ post: responseOne.data, comment: responseTwo.data, length: responseOne.length })

}))
      
  }




  useEffect(()=>{
    //   fetchPosts();
      fetch();
      
       const interval=setInterval(()=>{
      fetch();
     },5000)
       
       
     return()=>clearInterval(interval)
  }, [setDataFetch]);






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
  

 const Like =async (id,like) => {
        const dataForm = new FormData();
        const likes = like + 1;
         dataForm.append('likes',likes);
      console.log(likes);
        await axios.post(`api/Like/${id}`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                  
                }
        });
    
   
    }
    const DisLike =async (id,dislike) => {
        const dataForm = new FormData();
        const dislikes = dislike + 1;
         dataForm.append('dislikes',dislikes);
        await axios.post(`api/DisLike/${id}`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                
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

if(typeof localStorage["token"] !== 'undefined')
{
    return ( 
        <div>
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





            <Navigation />
            { dataFetch.length != 0 ?
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
                    {/* <form onSubmit={addComment}> */}
                        {/* <input type="text" name={post.id} value={post.id} onChange={getInputValue}></input> */}
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')} width="40"/>
                    <textarea class="form-control ml-1 shadow-none textarea" name={post.id}
                    id={post.id} 
                    value ={com[post.id]}
                    onChange={inputchangehandler}
                    ></textarea></div>
                    <div class="mt-2 text-right"><Button onClick={()=>addComment(post.id)} class="btn btn-primary btn-sm shadow-none">Post comment</Button></div>
                    {/* </form> */}
                </div>
            </div>
        </div>))}


        



    </div>

    </div>
    :
    <div className="notice">
        <h1>No Resualt !!</h1>
    </div>

                }</div>
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
 
export default SearchPage;