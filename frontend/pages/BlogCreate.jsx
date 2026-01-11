import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import { useParams }from 'react-router-dom'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'
import { useContext } from "react";
import { AppContext } from "../contexts/LoginProvider";


const BlogCreate = () => {
    const [title, setTitle] = useState("");

    const user = JSON.parse(localStorage.getItem('user'))
  const [blogData, setBlogData] = useState(null);
  const [content, setContent] = useState([]);
  const editorInstance = useRef(null);
  const {id} = useParams()

  const createSubmit = async () => {
  try {
     if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const payload = { title: title, description: content , author: user.id};
    console.log("Payload being sent to API:", payload);

    const res = await axios.post(`http://127.0.0.1:8000/blog/create`, payload);
    console.log(res.data);
    alert('create success')
  } catch (error) {
    console.log(error);
    alert('create failed')
  }
};

  

  // Initialize EditorJS once DOM exists and blogData is loaded
useEffect(() => {
  if (!document.getElementById("editorjs")) return;

  if (!editorInstance.current) {
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      tools: {
        header: { class: Header, inlineToolbar: true },
        list: { class: List, inlineToolbar: true },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: "Start writing your blog...",
          },
        },
      },
      data: {
        blocks: [
          {
            type: "paragraph",
            data: { text: "" },
          },
        ],
      },
      async onChange() {
        const output = await editorInstance.current.save();
        setContent(output.blocks);
      },
    });
  }

  return () => {
    if (editorInstance.current?.destroy) {
      editorInstance.current.destroy();
      editorInstance.current = null;
    }
  };
}, []);

;

  return (<>
  <PrimarySearchAppBar/>
  <div className="mx-auto p-2 col-5">

    
    <input
      type="text"
      placeholder="Blog title..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
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
    <button type="button"  className='btn btn-primary  col-2' onClick={createSubmit}>save</button>

    </div>
  </>
    
  );
};

export default BlogCreate;
