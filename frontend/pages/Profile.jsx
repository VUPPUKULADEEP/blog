import React, { useContext, useEffect, useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { AppContext } from '../contexts/LoginProvider'
import axios from 'axios'
import IndCard from '../components/IndCard'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userBlogs, setUserBlogs] = useState(null)
  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`http://127.0.0.1:8000/blogs/users/${user.id}`)
      console.log(response.data)
      setUserBlogs(response.data)
    }
    fetchData()
  },[])
  return (
    <>
    <PrimarySearchAppBar/>
    <div className='container-fluid d-flex flex-column align-items-center mt-5'>
    <img height={100} width={100}  src={'../src/assets/profile.jpg'}/>
    <p>{user.email}</p>
    <p>{user.fullname}</p>
    <p>{user.id}</p>
    </div>
    <div >
    {userBlogs && userBlogs.map((blog) => (
       <IndCard key={blog['blog_id']} data={blog} edit={true}/>
    ))}
    </div>
    </>
    
  )
}

export default Profile