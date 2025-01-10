import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function ResumeItem({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`} className='pt-7'>
      <div className='bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <Notebook />
      </div>
      <h2 className='text-center my-1'>{resume.Title}</h2>
    </Link>
  );
}

export default ResumeItem;
