import { Button } from "@/components/ui/button";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { useState } from "react";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import { useNavigate } from "react-router-dom";

function FormSection() {
  const maxIndex = 5;
  const minIndex = 1;
  const [activeFormIndex, setActiveFormIndex] = useState(minIndex);
  const [enableNext, setEnableNext] = useState(true);
  const navigate = useNavigate();

  function incrementIndex() {
    if (activeFormIndex === maxIndex) return;
    setActiveFormIndex((ind) => ind + 1);
  }
  return (
    <div>
      {/* navigation and setting btns */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <Button onClick={() => navigate("/dashboard")}>
            <Home />
          </Button>
          <Button size='sm' variant='outline' className='flex gap-2'>
            <LayoutGrid /> <span>Theme</span>
          </Button>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > minIndex && (
            <Button
              size='sm'
              onClick={() => setActiveFormIndex((ind) => ind - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < maxIndex && (
            <Button
              onClick={incrementIndex}
              disabled={!enableNext}
              className='flex gap-2'
              size='sm'
            >
              <span>Next</span> <ArrowRight />{" "}
            </Button>
          )}
        </div>
      </div>

      {/* forms */}
      {activeFormIndex === 1 && (
        <PersonalDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 2 && (
        <SummaryForm enableNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 3 && (
        <ExperienceForm enableNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 4 && (
        <EducationForm enableNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 5 && <SkillsForm />}
    </div>
  );
}

export default FormSection;
