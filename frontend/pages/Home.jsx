import React from 'react'
import { useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { useEffect } from 'react'
import axios from 'axios'
import IndCard from '../components/IndCard'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/`)
        setBlogs(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchBlog();
  }, [])
  return (
    <>
    <PrimarySearchAppBar/>
    {blogs.map((blog) => (
           <IndCard key={blog['blog_id']} data={blog} edit={false}/>
        ))}
    </>
  )
}

export default Home