/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState } from "react";
import GlobalApi from "./../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { ChatSession } from "./../../../../../services/GeminiApi";

const PROMPT =
  "Job Title: {JOBTITLE}; Give me 4-5 lined summary as per Job title ready to add in a resume for job application in JSON format with fields experienceLevel and summary, experience levels are fresher, mid-level and experienced";

function SummaryForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState();
  const params = useParams();
  const [loading2, setLoading2] = useState(false);
  const [summaryList, setSummaryList] = useState();

  const handleInputChange = (summ) => {
    enableNext(false);

    setSummary(summ);
    setResumeInfo({
      ...resumeInfo,
      summary: summ,
    });
  };

  const handleGenerate = async () => {
    setLoading2(true);
    const prompt = PROMPT.replace("{JOBTITLE}", resumeInfo?.jobTitle);
    console.log(prompt);
    const result = await ChatSession.sendMessage(prompt);

    const list = JSON.parse(result.response.text());
    console.log(list);
    setSummaryList(list);
    setLoading2(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary,
      },
    };

    GlobalApi.updateUserResume(params?.resumeid, data)
      .then((res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Summary Added successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10'>
        <h2 className='font-bold text-lg'>Summary </h2>
        <p>Enhance your resume with a summary</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label htmlFor=''>Add Summary</label>
            <Button
              className='border-primary flex gap-2 text-primary'
              size='sm'
              variant='outline'
              type='button'
              onClick={handleGenerate}
              disabled={loading2}
            >
              {loading2 ? <LoaderCircle className='animate-spin' /> : <Brain />}
              Generate with AI
            </Button>
          </div>

          <Textarea
            className='mt-5'
            required
            onChange={(e) => handleInputChange(e.target.value)}
            value={resumeInfo?.summary}
          />

          <div className='mt-2 flex justify-end'>
            <Button disabled={loading || loading2} type='submit'>
              {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
            </Button>{" "}
          </div>
        </form>
      </div>

      {summaryList && (
        <div>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {summaryList.map((item, index) => (
            <div
              key={index}
              className='rounded-lg shadow-lg cursor-pointer p-2'
              onClick={() => handleInputChange(item?.summary)}
            >
              <h2 className='font-bold my-1 capitalize'>
                {item?.experienceLevel}
              </h2>
              <p className='text-xs'>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SummaryForm;
