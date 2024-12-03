import { chatSession } from "@/configs/AiModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { Bold, Code, Highlighter, Italic, Sparkle, Sparkles, Subscript, Underline } from "lucide-react";
import { useParams } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const EditorExtensions = ({ editor }) => {
  const { fileId } = useParams();
  const saveNotes = useMutation(api.notes.addNotes);
  const { user } = useUser();
  const bold = () => {
    editor.chain().focus().toggleBold().run();
  };
  const italic = () => {
    editor.chain().focus().toggleItalic().run();
  };
  const code = () => {
    editor.chain().focus().toggleCode().run();
  };
  const highlight = () => {
    editor.chain().focus().toggleHighlight().run();
  };
  const underline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const subscript = () => {
    editor.chain().focus().toggleSubscript().run();
  };

  const SearchAi = useAction(api.myAction.search);

  const onAiClick = async () => {
    toast('Getting your answer...')
    
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    )
    console.log(selectedText)

    const result = await SearchAi({
      query: selectedText,
      fileId: fileId,
    });

    console.log("Unformatted answer", result);
    
    const unformattedAns = JSON.parse(result);
    console.log(unformattedAns);
    let allUnformattedAns = '';
    
    unformattedAns && unformattedAns.forEach(item => {
      allUnformattedAns += item.pageContent;
    });

    const PROMPT = `Using the following question and content:

Question: "${selectedText}"
Answer Content: "${allUnformattedAns}"

Please format the answer content into a complete, well-structured HTML response. Ensure it includes appropriate tags for paragraphs, headings, lists (if applicable), and any other relevant HTML elements. Do not request additional input; format it fully within the response.`;

    const aiModelResult = await chatSession.sendMessage(PROMPT)

    console.log(aiModelResult.response.text());

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress
    })
  }

  return (
    editor && (
      <div className="p-3 flex gap-3">
        <SingleExtension
          classname="bold"
          func={bold}
          editor={editor}
          Component={Bold}
        />
        <SingleExtension
          classname="italic"
          func={italic}
          editor={editor}
          Component={Italic}
        />
        <SingleExtension
          classname="code"
          func={code}
          editor={editor}
          Component={Code}
        />
        <SingleExtension
          classname="highlight"
          func={highlight}
          editor={editor}
          Component={Highlighter}
        />
        <SingleExtension
          classname="underline"
          func={underline}
          editor={editor}
          Component={Underline}
        />
        <SingleExtension
          classname="subscript"
          func={subscript}
          editor={editor}
          Component={Subscript}
        />

        <button
        onClick={() => onAiClick()}
        className="hover:text-blue-500"
        >
          <Sparkles/>
        </button>
        
      </div>
    )
  );
};

const SingleExtension = ({ classname, func, editor, Component }) => {
  return (
    editor && (
      <button
        onClick={func}
        className={editor.isActive(`${classname}`) ? "text-blue-500" : ""}
      >
        <Component />
      </button>
    )
  );
};

export default EditorExtensions;
