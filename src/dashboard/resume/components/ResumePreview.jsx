import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetailsPreview from "./preview/PersonalDetailsPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ProfessionalExpPreview from "./preview/ProfessionalExpPreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className='shadow-lg h-full p-14 border-t-[20px]'
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* personal details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      {/* summary */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* professional expericence */}
      <ProfessionalExpPreview resumeInfo={resumeInfo} />
      {/* educational */}
      <EducationalPreview resumeInfo={resumeInfo} />
      {/* skills */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
