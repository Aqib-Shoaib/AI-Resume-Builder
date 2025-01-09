/* eslint-disable react/prop-types */
function SummaryPreview({ resumeInfo }) {
  return <p className='text-sm font-normal'>{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
