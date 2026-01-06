import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Blogedit = ({ content, setContent, editable = true }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    editable,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    }
  })

  // Update editor when content changes (important for edit page)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '10px' }}>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Blogedit
