import React, { useContext, useEffect, useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { AppContext } from '../contexts/LoginProvider'
import axios from 'axios'
import IndCard from '../components/IndCard'
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const [userBlogs, setUserBlogs] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${API}/blogs/users/${user.id}`)
      console.log(response.data)
      setUserBlogs(response.data)
    }
    fetchData()
  }, [])
  return (
    <>
      <PrimarySearchAppBar />
      <div className='container-fluid d-flex flex-column align-items-center mt-5'>
        <PersonIcon sx={{ fontSize: 150 }}/>
        <p>email : {user.email}</p>
        <p>name : {user.fullname}</p>
        {/* <p>{user.id}</p> */}
      </div>
      <div >
        {userBlogs && userBlogs.map((blog) => (
          <IndCard key={blog['blog_id']} data={blog} edit={true} />
        ))}
      </div>
    </>

  )
}

export default Profile