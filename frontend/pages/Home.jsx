import React from 'react'
import { useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { useEffect } from 'react'
import axios from 'axios'
import IndCard from '../components/IndCard'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/`)
        setBlogs(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchBlog();
  }, [])
  return (
    <>
    <PrimarySearchAppBar/>
    <div className='container-fluid d-flex flex-column align-items-center'>
    {blogs.map((blog) => (
           <IndCard key={blog['blog_id']} data={blog} edit={false}/>
        ))}
    </div>
    </>
  )
}

export default Home