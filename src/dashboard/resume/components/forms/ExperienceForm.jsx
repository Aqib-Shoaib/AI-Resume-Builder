/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useRef, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "./../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formField = {
  title: "",
  company: "",
  city: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function ExperienceForm({ enableNext }) {
  const [experienceList, setExperienceList] = useState([formField]);
  const { setResumeInfo, resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (resumeInfo?.Experience && !hasInitialized.current) {
      setExperienceList(resumeInfo.Experience);
      hasInitialized.current = true;
    }
  }, [resumeInfo]);

  const handleChange = (index, e) => {
    enableNext(false);
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
    setResumeInfo((prev) => ({ ...prev, Experience: newEntries }));
  };

  const handleTextEditorChange = (val, name, index) => {
    enableNext(false);
    const newEntries = experienceList.slice();
    newEntries[index][name] = val;
    setExperienceList(newEntries);
    setResumeInfo((prev) => ({ ...prev, Experience: newEntries }));
  };

  const addMoreExp = () => {
    setExperienceList((prev) => [...prev, { ...formField }]);
  };

  const removeExp = () => {
    setExperienceList((exp) => exp.slice(0, -1));
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Format dates in yyyy-MM-dd format
    const formattedExperienceList = experienceList.map((exp) => ({
      ...exp,
      startDate: exp.startDate
        ? new Date(exp.startDate).toISOString().split("T")[0]
        : "",
      endDate: exp.endDate
        ? new Date(exp.endDate).toISOString().split("T")[0]
        : "",
    }));

    const data = {
      data: {
        Experience: formattedExperienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.updateUserResume(params?.resumeid, data)
      .then((res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Experience updated", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast("Error updating experience", "error");
      });
  };

  useEffect(
    function () {
      setResumeInfo((prev) => ({ ...prev, Experience: experienceList }));
    },
    [experienceList, setResumeInfo]
  );

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous job experience</p>
        <form>
          <div>
            {experienceList.map((exp, index) => (
              <div
                key={index}
                className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'
              >
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input
                    type='text'
                    name='title'
                    value={exp.title}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input
                    type='text'
                    name='company'
                    value={exp.company}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input
                    type='text'
                    name='city'
                    value={exp.city}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input
                    type='date'
                    name='startDate'
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div className='col-span-2'>
                  <RichTextEditor
                    defaultValue={exp.workSummary}
                    index={index}
                    handleTextEditorChange={(val) =>
                      handleTextEditorChange(val, "workSummary", index)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                className='text-primary'
                onClick={addMoreExp}
                type='button'
              >
                + Add more
              </Button>
              {experienceList.length > 1 && (
                <Button
                  variant='outline'
                  className='text-primary'
                  onClick={removeExp}
                  type='button'
                >
                  - Remove
                </Button>
              )}
            </div>
            <Button onClick={onSave} disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;
