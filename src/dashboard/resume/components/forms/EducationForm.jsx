/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../services/GlobalApi";
import { toast } from "sonner";

function EducationForm({ enableNext }) {
  const [educationalList, setEducationalList] = useState([
    {
      university: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const { setResumeInfo, resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (resumeInfo?.Education && !hasInitialized.current) {
      setEducationalList(resumeInfo.Education);
      hasInitialized.current = true;
    }
  }, [resumeInfo]);

  const handleChange = (e, index) => {
    enableNext(false);
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
    setResumeInfo((prev) => ({ ...prev, Education: newEntries }));
  };
  const addMoreEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        university: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const removeEducation = () => {
    setEducationalList((edu) => edu.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    // Format dates in yyyy-MM-dd format
    const formattedEducationList = educationalList.map((edu) => ({
      ...edu,
      startDate: edu.startDate
        ? new Date(edu.startDate).toISOString().split("T")[0]
        : "",
      endDate: edu.endDate
        ? new Date(edu.endDate).toISOString().split("T")[0]
        : "",
    }));

    const Data = {
      data: {
        Education: formattedEducationList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.updateUserResume(params?.resumeid, Data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        enableNext(true);
        toast("Education updated", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast("Error updating education", "error");
      });
  };

  useEffect(
    function () {
      setResumeInfo((prev) => ({ ...prev, Education: educationalList }));
    },
    [educationalList, setResumeInfo]
  );

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add your educational details</p>

        <div>
          {educationalList.map((edu, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                  <label>University Name</label>
                  <Input
                    name='university'
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={edu.university}
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    name='degree'
                    onChange={(e) => handleChange(e, index)}
                    value={edu.degree}
                  />
                </div>
                <div>
                  <label>Major</label>
                  <Input
                    name='major'
                    value={edu.major}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input
                    name='startDate'
                    value={edu.startDate}
                    type='date'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <Input
                    name='endDate'
                    value={edu.endDate}
                    type='date'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className='col-span-2'>
                  <label>Description</label>
                  <Textarea
                    name='description'
                    type='date'
                    onChange={(e) => handleChange(e, index)}
                    value={edu.description}
                    defaultValue={edu.description}
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
              onClick={addMoreEducation}
            >
              + Add more
            </Button>
            {educationalList.length > 1 && (
              <Button
                variant='outline'
                className='text-primary'
                onClick={removeEducation}
              >
                - Remove
              </Button>
            )}
          </div>
          <Button onClick={onSave}>
            {loading ? <LoaderCircle classname='animate spin' /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
