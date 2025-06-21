import { Input } from "@/components/ui/input";
import { useContext, useEffect, useRef, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function SkillsForm() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { setResumeInfo, resumeInfo } = useContext(ResumeInfoContext);
  const { resumeid } = useParams();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (resumeInfo?.skills && !hasInitialized.current) {
      setSkillsList(resumeInfo.skills);
      hasInitialized.current = true;
    }
  }, [resumeInfo]);

  function handleChange(index, name, value) {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  }
  function addMoreSkill() {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  }
  function removeSkill() {
    setSkillsList((skill) => skill.slice(0, -1));
  }
  function onSave() {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.updateUserResume(resumeid, data)
      .then((res) => {
        console.log(res);
        toast("Skills updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Sever Error, Skills update failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(
    function () {
      setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
    },
    [skillsList, setResumeInfo]
  );

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add your Skills</p>

        {skillsList.map((skill, index) => (
          <div
            key={index}
            className='flex justify-between border rounded-lg p-3 my-2 items-center'
          >
            <div>
              <label className='text-xs mb-1'>Name</label>
              <Input
                onChange={(e) => handleChange(index, "name", e.target.value)}
                value={skill.name}
              />
            </div>
            <div className='flex items-center '>
              <Rating
                style={{ maxWidth: 120 }}
                value={skill.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              className='text-primary'
              onClick={addMoreSkill}
            >
              + Add more
            </Button>
            {skillsList.length > 1 && (
              <Button
                variant='outline'
                className='text-primary'
                onClick={removeSkill}
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

export default SkillsForm;
