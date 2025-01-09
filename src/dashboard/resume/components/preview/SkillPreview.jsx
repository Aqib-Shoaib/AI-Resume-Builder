/* eslint-disable react/prop-types */
export default function SkillPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        My Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill) => (
          <div key={skill.id} className='flex items-center justify-between'>
            <h2 className='text-xs'>{skill?.name}</h2>
            <div className='h-2 bg-gray-200 w-[120px]'>
              <div
                className='h-2'
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${skill?.rating}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
