import React, { useEffect, useState } from 'react';
import "./user.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const User=()=>{

const [users,setUsers]=useState([]);

    useEffect(()=>{
    const fetchData= async()=>{

    const response=await axios.get("http://localhost:8000/api/getall")
      setUsers(response.data)

 
    }

    fetchData();
    },[])

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success(response.data.msg, { position: "top-right" });
        } catch (error) {
            console.log(error);
        }
    };
    return(
       <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>
        
        <table border={0}cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S. no.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index)=>{
                        return(
                            <tr key={user._id}>
                                <td>{index +1}</td>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.email}</td>
                                <td className='actionButton'>
                                    <button  onClick={()=>deleteUser(user._id)}  className='actionButton'><i className="fa-solid fa-trash"></i></button>
                                    <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                </td>
                            </tr>
                        )
                    })
                }
               
            </tbody>
        </table>
       </div>

    )

}
export default User;