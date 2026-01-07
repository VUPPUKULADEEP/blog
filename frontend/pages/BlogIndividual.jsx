import React, { useEffect, useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogIndividual = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/${id}`)
        setBlog(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchBlog();
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!blog) return <p>Blog not found</p>

  return (
    <>
      <PrimarySearchAppBar/>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1>{blog.title}</h1>

        {blog.description && blog.description.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={index}>{block.data.text}</p>;
          } else if (block.type === "header") {
            const Tag = `h${block.data.level || 2}`;
            return <Tag key={index}>{block.data.text}</Tag>;
          } else if (block.type === "list") {
            if (block.data.style === "ordered") {
              return <ol key={index}>
                {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            } else {
              return <ul key={index}>
                {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            }
          }
          return null;
        })}
      </div>
    </>
  )
}

export default BlogIndividual
