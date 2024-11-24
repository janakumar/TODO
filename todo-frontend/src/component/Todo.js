import React, { useState } from 'react'
import'./Todo.css'

const Todo = () => {
  //for storing title
  const [title,setTitle]=useState("");
  //for storing description
  const [description,setDescription]=useState("");
  //for display input fields
  const[todos,setTodos]=useState([]);
  //error
  const[error,setError]=useState("")
  //success
  const[success,setSuccess]=useState("")


  const submit = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      fetch("http://localhost:3500/todos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      })
        .then((res) => {
          if (res.ok) {
            setTodos([...todos, { title, description }]);
            setSuccess("Item Added Successfully");
          } else {
            setError("Unable to add item");
          }
        })
    }
  };
  
  return (
    <div className='todo'>
      <div className='heading'>
        <h1>TODO PROJECT USING MERN STACK</h1>
      </div>
      <div className='row'>
        <h2>Add Item</h2>
        <p>{success}</p>
        <div className='input'>
          <input type='text' placeholder='title'  value={title} onChange={(e)=>setTitle(e.target.value)} className='title'/>
          <input type='text' placeholder='description'value={description} onChange={(e)=>setDescription(e.target.value)}  className='description'/>
          <button className='submit' onClick={submit}>Submit</button>
          </div>
          <p>{error}</p>
      </div>
    </div>
  )
}

export default Todo