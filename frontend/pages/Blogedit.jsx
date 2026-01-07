import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import { useParams }from 'react-router-dom'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'

const BlogEdit = () => {
  const [blogData, setBlogData] = useState(null);
  const [content, setContent] = useState([]);
  const editorInstance = useRef(null);
  const {id} = useParams()

  const editSubmit = async () => {
  try {
    if(!blogData?.title){
          return 'title is missing'
        }
    const payload = { title: blogData.tile, description: content };
    console.log("Payload being sent to API:", payload);

    const res = await axios.put(`http://127.0.0.1:8000/blogs/modify/${id}`, payload);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        
        const res = await axios.get(`http://127.0.0.1:8000/blogs/${id}`);
        console.log(res.data)
        setBlogData(res.data);
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
  <PrimarySearchAppBar/>
  <div className="story-editor">
      <div id="editorjs" />
    </div>
    <button type="button" onClick={editSubmit}>save</button>
  </>
    
  );
};

export default BlogEdit;
