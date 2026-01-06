import React, { useEffect } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const BlogIndividual = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState()
    useEffect(() => {
      const fetchBlog = async () => {
      try{
        const response = await axios.get(`http://127.0.0.1:8000/blogs/${id}`)
        console.log(response.data)
        setBlog(response.data)
        console.log(blog)
      }
      catch(error){
        console.error(error);
      }
    }
    fetchBlog();
    }, [id])
  return (
    <>
    <PrimarySearchAppBar/>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>{blog.title}</h1>
    <p>{blog.description}</p>
    </div>
    

    </>
  )
}

export default BlogIndividual