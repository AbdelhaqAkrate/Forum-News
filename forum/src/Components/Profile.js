import "../styles/profil.css";
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Navigation from './Navbar';
import Signin from "./Signin";
import AdminNav from "./admin/Navbar";
import { createBrowserHistory } from "history";
const Profile = () => {
const history = createBrowserHistory();
 const [data,setData] = useState({
        name:'',
        password:'',
        messages:[]
    });
const [info, setInfo] = useState([]);
 const inputchangehandler = async (e) =>{
        setData({...data, [e.target.name]: e.target.value});
    }
     const updateUser = () => {
        const dataForm = new FormData();
      
         dataForm.append('name',data.name);
        dataForm.append('password',data.password);
         axios.post(`/api/updateUser/${localStorage['user_id']}`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                    swal("Success",res.data.message)
                }
                else{
                    swal("Success",res.data.message)
                }
        });
   
    }
       useEffect(() => {
  axios.get(`/api/info/${localStorage['user_id']}`)
  .then(res =>{
        setInfo(res.data);
  })
      
    })
 
if(typeof localStorage["token"] !== 'undefined')
{
    return ( 
        <div className="profil">
           
           
          { (typeof localStorage["token"] !== 'undefined' && typeof localStorage["adminToken"] == 'undefined') &&

            <Navigation /> 
        }  
          { (typeof localStorage["token"] === 'undefined' && typeof localStorage["adminToken"] != 'undefined') &&

            <AdminNav /> 
        }  




            <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center imagebox"><img class="rounded-circle mt-5"  src={require('../imgs/hero-office-snoo_2021-08-19-001022_wfxa.png')}/><span class="font-weight-bold">{info.name}</span><span class="text-black-50">{info.email}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" name="name" placeholder="username" value={data.name} onChange={inputchangehandler}/></div>
                    <div class="col-md-6"><input type="password" class="form-control" name="password" value={data.password} onChange={inputchangehandler} placeholder="password"/></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={()=>updateUser()} type="button">Save Profile</button></div>
            </div>
        </div>
    </div>
</div>
</div>
// </div>

//         </div>
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
 
export default Profile;