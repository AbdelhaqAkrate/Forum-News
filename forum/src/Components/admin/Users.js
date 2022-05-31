import AdminNav from "./Navbar";
import React,{useEffect,useState} from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import axios from "axios";
import swal from "sweetalert";
const Users = () => {
    const [users , setUsers] = useState([]);
    useEffect(() => {
   
     axios.get(`/api/users`)
     .then(res => {
      setUsers(res.data);
      })
    
  });


      const Delete = (id) =>
    {
      
        axios.get(`/api/DeleteUser/${id}`)
        .then(result=>
            {
                 swal("Success",result.data.message);
            })
            .catch(err =>{
                console.log(err)
            })
  
    }



    return ( 
    <div>
        <AdminNav />
        <div class="container mt-5">
            <div class="p-4 bold"><h1>List Of Users</h1></div>
            <table class="table table-borderless table-responsive card-1 p-4">
  <thead>
    <tr class="border-bottom">
      <th>
          <span class="ml-2">ID</span>
      </th>
      <th>
          <span class="ml-2">Username</span>
      </th>
      <th>
          <span class="ml-2">Email</span>
      </th>
      <th>
          <span class="ml-4">Action</span>
      </th>
    </tr>
  </thead>
  <tbody>
    {users.map(user=>(
    <tr class="border-bottom">
      <td>
              <div class="p-1">
                  <span class="d-block font-weight-bold">{user.id}</span>
              </div>
       

      </td>
      <td>
          <div class="p-1">
              <span class="font-weight-bold">{user.name}</span>
          </div>
      </td>
      <td>
          <div class="p-1">
              <span class="font-weight-bold">{user.email}</span>
  
          </div>
      </td>
      <td>
          <div class="p-1 icons">
            <button className="btn btn-info" onClick={()=>Delete(user.id)}><AiOutlineUserDelete /></button>
          </div>
      </td>
    </tr>
    
))}



    


  </tbody>
</table>
    
         
     </div>
    </div> 
    );



}
 
export default Users;