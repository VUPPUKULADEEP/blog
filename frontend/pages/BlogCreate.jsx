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

    const {userData} = useContext(AppContext)
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
    const payload = { title: title, description: content , author: userData.id};
    console.log("Payload being sent to API:", payload);

    const res = await axios.post(`http://127.0.0.1:8000/blog/create`, payload);
    console.log(res.data);
  } catch (error) {
    console.log(error);
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
  <div className="story-editor">

    
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
    <button type="button"  className='btn-primary' onClick={createSubmit}>save</button>
  </>
    
  );
};

export default BlogCreate;
