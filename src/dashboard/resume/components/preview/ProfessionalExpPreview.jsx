/* eslint-disable react/prop-types */
function ProfessionalExpPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience.map((exp) => (
        <div key={exp?.id}>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {exp?.title}
          </h2>
          <h2 className='text-xs flex justify-between'>
            <span>
              {exp?.company}, {exp?.city}{" "}
            </span>
            <span>
              {exp?.startDate}-
              {!exp?.currentlyWorking ? exp?.endDate : "Present"}
            </span>
          </h2>
          <p className='text-xs my-2'>{exp?.workSummary}</p>
        </div>
      ))}
    </div>
  );
}

export default ProfessionalExpPreview;
