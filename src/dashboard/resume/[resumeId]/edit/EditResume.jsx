import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditResume() {
  const params = useParams();

  useEffect(
    function () {
      console.log(params);
    },
    [params]
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* form section */}
      {/* preview section */}
    </div>
  );
}

export default EditResume;
