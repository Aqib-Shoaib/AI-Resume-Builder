/* eslint-disable react/prop-types */
function PersonalDetailsPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className='font-bold text-xl text-center'
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className='text-center text-sm font-medium'>
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className='text-xs text-center font-normal'>{resumeInfo?.address}</h2>

      <div
        className='flex justify-between text-xs font-normal'
        style={{ color: resumeInfo?.themeColor }}
      >
        <h2>{resumeInfo?.phone}</h2>
        <h2>{resumeInfo?.email}</h2>
      </div>

      <hr
        className='border-[1.5px] my-2'
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default PersonalDetailsPreview;
