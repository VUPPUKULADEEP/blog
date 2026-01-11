import React, { useEffect, useState } from 'react'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogIndividual = () => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API}/blogs/${id}`)
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
      <PrimarySearchAppBar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 blog-content">

            <h1 className="blog-title mb-4 text-center">
              {blog.title}
            </h1>

            {blog.description?.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="blog-paragraph">
                    {block.data.text}
                  </p>
                );
              }

              if (block.type === "header") {
                const Tag = `h${block.data.level || 6}`;
                return (
                  <Tag key={index} className="blog-header mt-4 mb-2">
                    {block.data.text}
                  </Tag>
                );
              }

              if (block.type === "list") {
                return block.data.style === "ordered" ? (
                  <ol key={index} className="blog-list">
                    {block.data.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul key={index} className="blog-list">
                    {block.data.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}

          </div>
        </div>
      </div>
    </>

  )
}

export default BlogIndividual
