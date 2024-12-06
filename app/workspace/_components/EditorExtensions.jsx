import { chatSession } from "@/configs/AiModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  Sparkle,
  Sparkles,
  Subscript,
  Underline,
} from "lucide-react";
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

  const align = (dir) => {
    editor.chain().focus().setTextAlign(dir).run()
  };

  const SearchAi = useAction(api.myAction.search);

  const onAiClick = async () => {
    toast("Getting your answer...");

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("Selected Text:", selectedText);

    try {
      const result = await SearchAi({
        query: selectedText,
        fileId: fileId,
      });

      console.log("Unformatted answer", result);

      let allUnformattedAns = "";

      if (Array.isArray(result)) {
        result.forEach((item) => {
          allUnformattedAns += item.pageContent;
        });
      } else if (result && typeof result === "object") {
        allUnformattedAns = result.pageContent || ""; // Adjust based on structure
      } else if (typeof result === "string") {
        allUnformattedAns = result;
      } else {
        console.error("Unexpected result format:", result);
      }

      const PROMPT = `Using the following question and content:
                      Question: "${selectedText}"
                      Answer Content: "${allUnformattedAns}"
                      Please format the answer content into a complete, well-structured HTML response.
                       Ensure it includes appropriate tags for paragraphs, headings, lists (if applicable), and any other relevant HTML elements.
                       only answer the question refrain from any extra information.
                       Do not request additional input; format it fully within the response.`;

      const aiModelResult = await chatSession.sendMessage(PROMPT);
      const finalAnswer = aiModelResult.response
        .text()
        .replaceAll("```", "")
        .replace("html", "");

      const allText = editor.getHTML();

      editor.commands.setContent(
        `${allText} <p><strong></strong>${finalAnswer}</p>`
      );

      await saveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      console.error("Error in onAiClick:", error);
      toast("Error occurred while fetching AI response");
    }
  };

  const testSearchAi = useAction(api.myAction.search);

  const testingAiProcess = async () => {
    const query = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ""
    );

    try {
      const result = await testSearchAi({
        query,
        fileId,
      });
      console.log("Formatted Answer:", result);
      toast(result); // Optionally display the result in a toast
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

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
        <button onClick={onAiClick} className="hover:text-blue-500">
          <Sparkles />
        </button>
        {/* <SingleExtension
          classname="textAlign: 'right'"
          func={() => align('right')}
          editor={editor}
          Component={AlignRight}
        />
        <SingleExtension
          classname="textAlign: 'left'"
          func={() => align('left')}
          editor={editor}
          Component={AlignLeft}
        />
        <SingleExtension
          classname=''
          func={() => align('center')}
          editor={editor}
          Component={AlignCenter}
        /> */}
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
