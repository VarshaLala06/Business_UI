import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Form } from 'react-router-dom'

const Home = () => {
const formref=useRef(null)


async function Submit(){
  e.preventDefault();
    const formData=new FormData(formref.current)
    try{
      const response=await fetch("http://localhost:8080/add")
    }
    catch(err){

    }
}

  return (
    <>
    <div>
        Add an expense
    </div>
    <form ref={formref} onSubmit={Submit}>
  <div className="form-group" >
    <label htmlFor="exampleInputEmail1">Title</label>
    <input name="email" type="text" className="form-control"  placeholder="Enter Title"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Amount</label>
    <input type="number" className="form-control" placeholder="Enter Amount"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Notes</label>
    <input type="text" className="form-control" placeholder="Enter notes"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
    </>
  )
}

export default Home
