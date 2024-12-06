import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold } from "lucide-react";
import React, { useEffect } from "react";
import EditorExtensions from "./EditorExtensions";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

const TextEditor = ({ fileId }) => {
  const notes = useQuery(api.notes.getNotes, {
    fileId,
  });

  console.log(notes);

  const editor = useEditor({
    extensions: [
      TextAlign.configure({
        alignments: ['left', 'right', 'center'],
      }),
      Highlight,
      Underline,
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus: outline-none h-screen p-3",
      },
    },
  });
  
  

  useEffect(() => {
    if (editor && notes !== undefined) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

  return (
    <div>
      {editor ? (
        <>
          <EditorExtensions editor={editor} />
          <div className="overflow-scroll h-[88vh]">
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  );
};

export default TextEditor;
