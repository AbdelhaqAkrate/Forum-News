import { Form,Button } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import '../styles/Modal.css'

function UpdatePost({Data}){

    const [categories, setCategorie] = useState([]);
    const [message, setMessage] = useState('');
    const [hide, setHide] = useState("none");
    const [file, setFile] = useState([]);
    const [ Content,setContent] = useState();
    const update = (id) => {
        const dataForm = new FormData();
      
         dataForm.append('Content',Content);
      
         axios.post(`api/updatePost/${id}`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                  
                }
        });
        
   
    }

 const inputchangehandler = async (e) =>{
        setContent(e.target.value);
    }
  

  



    return ( 
         <Form>
            {/* { message !== '' ? <div className="message">{message} </div> : null } */}
              <Form.Group class="input_text">
                  {/* <input type="text" value={Data.id} /> */}
              </Form.Group>
              <Form.Group class="input_text">
                 {/* <center><img id="upload"  height="150" src={file} onChange={inputchangehandler} value={data.image}  style={{ display: hide }}/></center> */}
              {/* </Form.Group>
                <Form.Group class="input_text">
                    <Form.Select size="sm" aria-label="Default select example" name="cat" value={data.cat} onChange={inputchangehandler}>
                        <option>Select ...</option>
                    {categories.map(categorie => (
                        <option value={categorie.id} key={categorie.id} >{categorie.name}</option>
                     ))}
                    </Form.Select>
                </Form.Group> */}
             {/* <Form.Group class="input_text">
                <Form.Control
                    type="text"
                    placeholder="Title .."
                    name="title"
                    value = {data.title}
                    onChange={inputchangehandler}
                />
              </Form.Group> */}
          
              <Form.Group class="input_text">
                   <textarea class="form-control ml-1 shadow-none textarea" name="Content" onChange={inputchangehandler} value ={Content} placeholder="Write Something ......"></textarea>
              </Form.Group>
                {/* <Form.Group class="input_text file">
               <label for="upload">Upload a file</label>
                 
                <input type="file" name="image"  id="uploade"  accept="image/*"
                 onChange={imagechangehandler}
                
                 onClick={() => {
          setHide("block");
        }}/>
              </Form.Group> */}
             {/* <Form.Group> */}
                 <Button variant="success" onClick={()=>update(Data.id)} block>update</Button>
             </Form.Group>
          
         </Form>

     );
}
 
export default UpdatePost;