import React, { useContext, useEffect, useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { AppContext } from '../contexts/LoginProvider'
import axios from 'axios'
import IndCard from '../components/IndCard'

const Profile = () => {
  const {userData} = useContext(AppContext)
  const [userBlogs, setUserBlogs] = useState(null)
  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`http://127.0.0.1:8000/blogs/users/${userData.id}`)
      console.log(response.data)
      setUserBlogs(response.data)
    }
    fetchData()
  },[])
  return (
    <>
    <PrimarySearchAppBar/>
    <img height={100} width={100} src={'../src/assets/profile.jpg'}/>
    <p>{userData.email}</p>
    <p>{userData.fullname}</p>
    <p>{userData.id}</p>
    {userBlogs && userBlogs.map((blog) => (
       <IndCard key={blog['blog_id']} data={blog}/>
    ))}
    </>
  )
}

export default Profile