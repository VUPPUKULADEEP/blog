import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import { useParams } from 'react-router-dom'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'



const BlogEdit = () => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [editTitle, setTitle] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [content, setContent] = useState([]);
  const editorInstance = useRef(null);
  const { id } = useParams()

  const editSubmit = async () => {
    try {
      const output = await editorInstance.current.save();
      if (!editTitle) {
        return console.log('title is missing')
      }
      const payload = { title: editTitle, description: output.blocks };
      console.log("Payload being sent to API:", payload);

      const res = await axios.put(`${API}/modify/${id}`, payload);
      console.log(res.data);
      alert('edit success')
    } catch (error) {
      console.log(error);
      alert('edit not done')
    }
  };

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {

        const res = await axios.get(`http://127.0.0.1:8000/blogs/${id}`);
        console.log(res.data)
        setBlogData(res.data);
        setTitle(res.data.title)
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, []);

  // Initialize EditorJS once DOM exists and blogData is loaded
  useEffect(() => {
    if (!blogData) return;
    if (!document.getElementById("editorjs")) return;

    if (!editorInstance.current) {
      const blocks = Array.isArray(blogData.description)
        ? blogData.description
        : [{ type: "paragraph", data: { text: blogData.description || "" } }];

      editorInstance.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: { class: Header, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          paragraph: { class: Paragraph, inlineToolbar: true },
        },
        data: { blocks },
        async onChange() {
          const output = await editorInstance.current.save();
          setContent(output.blocks);
        },
      });
    }

    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === "function") {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [blogData]);
  ;

  return (<>
    <PrimarySearchAppBar />
    <div className="mx-auto p-2 col-5">


      <input
        type="text"
        value={editTitle}
        onChange={(e) => { setTitle(e.target.value); console.log('changing') }}
        style={{
          width: "100%",
          fontSize: "2rem",
          border: "none",
          outline: "none",
          marginBottom: "1rem",
        }}
      />
    </div>
    <div className="story-editor">
      <div id="editorjs" />
    </div>
    <div className="d-flex justify-content-center mx-auto p-2 col-6">
      <button type="button" onClick={editSubmit} className='btn btn-primary  col-2'>save</button>
    </div>
  </>

  );
};

export default BlogEdit;
