/* eslint-disable react/prop-types */
function ProfessionalExpPreview({ resumeInfo }) {
  return (
    <div className='my-6' key={resumeInfo?.id}>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Experience.map((exp, index) => (
        <div key={index}>
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
          {/* <p className='text-xs my-2'>{exp?.workSummary}</p> */}
          <div
            className='text-xs my-2'
            dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProfessionalExpPreview;
