import { useCallback, useEffect, useState } from "react";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";

function EditResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();

  const getUserResume = useCallback(() => {
    GlobalApi.getSingleUserResume(resumeid).then((res) => {
      console.log(res.data.data);
      setResumeInfo(res.data.data);
    });
  }, [resumeid]);

  useEffect(
    function () {
      getUserResume();
    },
    [getUserResume]
  );

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* form section */}
        <FormSection />
        {/* preview section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
