import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './add.css';
import axios from "axios";
import toast from "react-hot-toast";

const Add=()=>{
        const users={
            fname:"",
            lname:"",
            email:"",
            password:""

        }

        const [user ,setUser]= useState(users);
        const navigate= useNavigate();


    const inputHandler =(e)=>{

        const {name, value}= e.target;
        setUser({...user,[name]:value});
       
    }

      const submitForm=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create",user)
        .then((response)=>{
        toast.success(response.data.msg, {position:"top-right"})
        navigate("/");
        }).catch(error=>console.log(error))

      }
    return (
        <div className="addUser">
            <Link to={"/"}>Back</Link>
            <h3>Add New User/</h3>
            <form className="addUaerForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First name</label>
                    <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete="off" placeholder="first name" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Lirst name</label>
                    <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete="off" placeholder=" Lastname" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email"  onChange={inputHandler} name="email" autoComplete="off" placeholder="Email" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} id="password" name="password" autoComplete="off" placeholder="password " />
                </div>
                <div className="inputGroup">
                  <button type="submit">ADD USER</button>
                </div>
            </form>

        </div>
    )
}

export default Add;