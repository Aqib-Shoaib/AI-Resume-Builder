/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState } from "react";
import GlobalApi from "./../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";

function SummaryForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState();
  const params = useParams();

  const handleInputChange = (e) => {
    enableNext(false);
    const summ = e.target;

    setSummary(summ);
    setResumeInfo({
      ...resumeInfo,
      summary: summ,
    });
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
            >
              <Brain /> Generate with AI
            </Button>
          </div>

          <Textarea className='mt-5' required onChange={handleInputChange} />

          <div className='mt-2 flex justify-end'>
            <Button disabled={loading} type='submit'>
              {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
            </Button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SummaryForm;
