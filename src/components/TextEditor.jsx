import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-300 px-3 py-1 rounded" : "px-3 py-1 rounded border"}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-300 px-3 py-1 rounded" : "px-3 py-1 rounded border"}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-gray-300 px-3 py-1 rounded" : "px-3 py-1 rounded border"}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-300 px-3 py-1 rounded" : "px-3 py-1 rounded border"}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-300 px-3 py-1 rounded" : "px-3 py-1 rounded border"}
      >
        Ordered List
      </button>
    </div>
  );
};

export default function RichTextEditor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedContent = localStorage.getItem("editorContent");
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      localStorage.setItem("editorContent", html);
    },
  });

  return (
    <div className="border rounded-md p-4">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none border p-2" />
    </div>
  );
}