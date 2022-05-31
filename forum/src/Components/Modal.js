import { Form,Button } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import '../styles/Modal.css'

function CreatePost(){
    const [categories, setCategorie] = useState([]);
    const [message, setMessage] = useState('');
    const [hide, setHide] = useState("none");
    const [file, setFile] = useState([]);
    const [data,setData] = useState({
        title:'',
        Content:'',
        image:'',
        cat : '',
        messages:[]
    });

    const post =async (e) => {
        e.preventDefault();

    // const inputs ={
    //         title: data.title,
    //         Content: data.Content,
    //         image : file.image.name,
    //         likes : 0,
    //         dislikes : 0,
    //         user_id : localStorage['user_id'],
    //         categorie_id : parseInt(data.cat)
    //     }
        const dataForm = new FormData();
         dataForm.append('title',data.title);
         dataForm.append('Content',data.Content);
         dataForm.append('image',file.image);
         dataForm.append('likes',0);
         dataForm.append('dislikes',0);
         dataForm.append('user_id',localStorage['user_id']);
         dataForm.append('categorie_id',parseInt(data.cat));
      
        await axios.post(`api/create`, dataForm)
        .then(res =>{
                if(res.status === 200)
                {
                  console.log(res)
                }
                else{
                    setData({...data,messages: res.data['error']});
                    console.log(data.messages)
                }
        });
        
   
    }

 const inputchangehandler = async (e) =>{
        setData({...data, [e.target.name]: e.target.value});
    }
  
 const imagechangehandler = (e) =>{
  
 setFile({image:e.target.files[0]});

  
    }
    //  console.log(file.image.name)
  
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("api/categories");
      setCategorie(res.data);
    };
    fetch();
  }, []);


    return ( 
         <Form onSubmit={post}>
            {/* { message !== '' ? <div className="message">{message} </div> : null } */}
              <Form.Group class="input_text">
                  {/* <input type="text" value={Creanu.idCreanu} hidden/> */}
              </Form.Group>
              <Form.Group class="input_text">
                 {/* <center><img id="upload"  height="150" src={file} onChange={inputchangehandler} value={data.image}  style={{ display: hide }}/></center> */}
              </Form.Group>
                <Form.Group class="input_text">
                    <Form.Select size="sm" aria-label="Default select example" name="cat" value={data.cat} onChange={inputchangehandler}>
                        <option>Select ...</option>
                    {categories.map(categorie => (
                        <option value={categorie.id} key={categorie.id} >{categorie.name}</option>
                     ))}
                    </Form.Select>
                </Form.Group>
             <Form.Group class="input_text">
                <Form.Control
                    type="text"
                    placeholder="Title .."
                    name="title"
                    value = {data.title}
                    onChange={inputchangehandler}
                />
              </Form.Group>
              <Form.Group class="input_text">
                   <textarea class="form-control ml-1 shadow-none textarea" name="Content" onChange={inputchangehandler} value ={data.Content} placeholder="Write Something ......"></textarea>
              </Form.Group>
                <Form.Group class="input_text file">
               <label for="upload">Upload a file</label>
                 
                <input type="file" name="image"  id="uploade"  accept="image/*"
                 onChange={imagechangehandler}
                
                 onClick={() => {
          setHide("block");
        }}/>
              </Form.Group>
             <Form.Group>
                 <Button variant="success" type="submit" block>Post</Button>
             </Form.Group>
          
         </Form>

     );
}
 
export default CreatePost;