// import React, { useEffect, useState } from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import PrimarySearchAppBar from '../components/PrimarySearchAppBar'

// const Blogedit = ({ content, setContent, editable = true }) => {
//   const [blogdata, setBlogData] = useState(null)
//   const {id} = useParams();
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: content || '',
//     editable,
//     onUpdate: ({ editor }) => {
//       setContent(editor.getHTML())
//     }
//   })
//   useEffect(() => {
//       const fetchBlog = async () => {
//       try{
//         const response = await axios.get(`http://127.0.0.1:8000/blogs/${id}`)
//         console.log(response.data)
//         setBlogData(response.data)
//         setContent(response.data)
//         console.log(blogdata)
//       }
//       catch(error){
//         console.error(error); 
//       }
//       console.log(blogdata)
//     }
//     fetchBlog();
//     },[])
//   // Update editor when content changes (important for edit page)
//   useEffect(() => {
//     if (editor && content !== editor.getHTML()) {
//       editor.commands.setContent(content || '')
//     }
//   }, [content, editor])

//   return (
//     <>
//     <PrimarySearchAppBar/>
//      <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '10px' }}>
//       <EditorContent editor={editor}  />
//     </div>
//     </>
   
//   )
// }

// export default Blogedit


import React, { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './medium.css'
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'

const Blogedit = () => {
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [blogdata, setBlogData] = useState(null)

  // 🔑 This ref prevents re-setting content
  const isContentLoaded = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  // Fetch blog ONLY ONCE
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/${id}`)
        setBlogData(response.data)
        setContent(response.data.description)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlog()
  }, [id])

  // 🔥 SET CONTENT ONLY ONCE
  useEffect(() => {
    if (editor && content && !isContentLoaded.current) {
      editor.commands.setContent(content)
      isContentLoaded.current = true
    }
  }, [editor, content])
  
  const editedSubmit = async () => {
    try{
      const payload = {
        title : blogdata.title,
        description : content
      }
    
    const response = await axios.put(`http://127.0.0.1:8000/blogs/modify/${id}`,payload, {
      headers:{
        'Content-Type' : 'application/json'
      },
    })
    console.log('success')
    }
    catch(error){
      console.log('error')
    }
  }

  if (!editor) return null

  return (
    <>
    <PrimarySearchAppBar/>
    <div className="medium-editor">
      <h2>{blogdata?.title}</h2>

      {/* TOOLBAR */}
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</button>
        <button onClick={() => editor.chain().focus().undo().run()}>↶</button>
        <button onClick={() => editor.chain().focus().redo().run()}>↷</button>
      </div>

      <EditorContent editor={editor} />
    </div>
    <button type='button'onClick={editedSubmit}>save</button>
    </>
  )
}

export default Blogedit




