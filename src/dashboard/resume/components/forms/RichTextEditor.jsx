/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ChatSession } from "./../../../../../services/GeminiApi";
import { toast } from "sonner";

const PROMPT =
  "Position Title: {POSITIONTITLE}, depending on position title give me a summary of my experience in html format with fields only positionSummary";

function RichTextEditor({ handleTextEditorChange, index, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);
  const [generating, setGenerating] = useState(false);
  const { resumeInfo } = useContext(ResumeInfoContext);

  const generateWithAI = async () => {
    setGenerating(true);
    if (!resumeInfo?.Experience[index].title) {
      toast.error("Please enter a position title first");
      setGenerating(false);
      return;
    }
    const prompt = PROMPT.replace(
      "{POSITIONTITLE}",
      resumeInfo?.Experience[index].title
    );

    const result = await ChatSession.sendMessage(prompt);

    const res = JSON.parse(result.response.text())[0].positionSummary;
    setValue(res);
    handleTextEditorChange(res, "workSummary", index);

    setGenerating(false);
  };
  return (
    <div>
      <div className='flex justify-between items-center my-2'>
        <label className='text-xs'>Work Summary</label>
        <Button
          className='flex gap-2 border-primary text-primary'
          variant='outline'
          onClick={generateWithAI}
          size='sm'
          type='button'
          disabled={generating}
        >
          {generating ? <Loader2 className='animate-spin' /> : <Brain />}
          Generate With AI
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleTextEditorChange(value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
