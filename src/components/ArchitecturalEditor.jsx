import './ArchitecturalEditor.css';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { motion, AnimatePresence } from 'framer-motion';

const ArchitecturalEditor = ({ content, onChange, placeholder = "Envision your perspective..." }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'architectural-prose-root focus:outline-none',
        spellcheck: 'false',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="architectural-editor-wrapper">
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bubble-menu-root">
        <div className="bubble-toolbar-glass">
          <button 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            className={`toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
            title="BOLD"
          >
            B
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            className={`toolbar-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
            title="ITALIC"
          >
            I
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleBlockquote().run()} 
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
            title="QUOTE"
          >
            "
          </button>
          <div className="toolbar-divider"></div>
          <button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
            className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
            title="HEADING"
          >
            H
          </button>
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />
      
      {!editor.getText() && (
        <div className="editor-placeholder">{placeholder}</div>
      )}
    </div>
  );
};

export default ArchitecturalEditor;
