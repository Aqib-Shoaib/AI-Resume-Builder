/* eslint-disable react/prop-types */
function EducationalPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        My Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Education.map((edu) => (
        <div key={edu?.id} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {edu?.university}
          </h2>
          <h2 className='text-xs flex justify-between'>
            <span>
              {edu?.degree}, {edu?.major}
            </span>
            <span>
              {edu?.startDate}-{edu?.endDate}
            </span>
          </h2>
          <p className='text-xs my-2'>{edu?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
