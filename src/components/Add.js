import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Add() {
  let history = useHistory();
  const [userInfo, setuserInfo] = useState({
    title: '',
    description: '',
  });

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
  const ondescription = (value) => {
    setuserInfo({ ...userInfo,
      description:value
    });
  } 
  console.log(userInfo.description)

  const [isError, setError] = useState(null);
  
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if(userInfo.description.length < 50){
        setError('Required, Add description minimum length 50 characters');
        return;
      }
      axios.post(`http://localhost:3000/addArticle`, {
        title: userInfo.title,
        description: userInfo.description,
      })
      .then(res => {
        if(res.data.success === true){
          history.push('/');
        }
      })
    } catch (error) { throw error;}  
  } 


return ( 
<>

  <div className="App">
    <div className="container">
      <div className="row"> 
        <form onSubmit={addDetails} className="update__forms">
          <h3 className="myaccount-content"> ADD  </h3>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="font-weight-bold"> Subject <span className="required"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Your Subject" required />
            </div>
            <div className="clearfix"></div>
            <div className="form-group col-md-12 editor">
              <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
            <ReactQuill
              theme="snow"
              value={userInfo.description}
              onChange={ondescription}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            />
            
            <EditorToolbar toolbarId={'t1'}/>
            </div>
            <br />
            <br />
            {isError !== null && <div className="errors"> {isError} </div>}
            <div className="form-group col-sm-12 text-right">
              <button type="submit" className="btn btn__theme"> Submit  </button>
            </div> 
          </div> 
        </form>
      </div>
    </div>
  </div>
</>
)
}
export default Add