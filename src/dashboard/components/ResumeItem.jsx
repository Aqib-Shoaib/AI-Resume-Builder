import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function ResumeItem({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className='bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center h-[200px] border border-t-4 border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <Notebook />
        <h2 className='text-center my-1'>{resume.Title}</h2>
      </div>
    </Link>
  );
}

export default ResumeItem;
