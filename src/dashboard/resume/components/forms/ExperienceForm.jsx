import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  title: "",
  company: "",
  city: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function ExperienceForm() {
  const [experienceList, setExperienceList] = useState([formField]);
  const { setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, e) => {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setExperienceList(newEntries);
  };

  const handleTextEditorChange = (val, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = val;
    setExperienceList(newEntries);
  };
  const addMoreExp = () => {
    setExperienceList((prev) => [...prev, { ...formField }]);
  };
  const removeExp = () => {
    setExperienceList((exp) => exp.slice(0, -1));
  };

  useEffect(
    function () {
      console.log(experienceList);
      setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
    },
    [experienceList, setResumeInfo]
  );
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((exp, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input
                    type='text'
                    name='title'
                    value={exp.title}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input
                    type='text'
                    name='company'
                    value={exp.company}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input
                    type='text'
                    name='city'
                    value={exp.city}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input
                    type='date'
                    name='startDate'
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className='col-span-2'>
                  <RichTextEditor
                    index={index}
                    handleTextEditorChange={(val) =>
                      handleTextEditorChange(val, "workSummary", index)
                    }
                  />
                </div>
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
            >
              + Add more
            </Button>
            {experienceList.length > 1 && (
              <Button
                variant='outline'
                className='text-primary'
                onClick={removeExp}
              >
                - Remove
              </Button>
            )}
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceForm;
