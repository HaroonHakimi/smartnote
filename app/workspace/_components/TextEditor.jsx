import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const TextEditor = () => {
    const editor = useEditor({
      extensions: [StarterKit,
        Placeholder.configure({
            placeholder: 'Start typing...',
        })
      ],
      content: "",
      editorProps: {
        attributes: {
            class: 'focus: outline-none h-scren p-3'
        }
      }
    });
  return <EditorContent editor={editor} />;
};

export default TextEditor;
