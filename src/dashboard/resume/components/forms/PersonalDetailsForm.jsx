/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../services/GlobalApi";
import { toast } from "sonner";

function PersonalDetailsForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData ?? {},
    };

    GlobalApi.updateUserResume(params?.resumeid, data)
      .then((res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Personal details saved successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get Started With basic details</p>
      <form onSubmit={onSave}>
        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div>
            <label className='text-sm' htmlFor=''>
              First Name
            </label>
            <Input
              name='firstName'
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm' htmlFor=''>
              Last Name
            </label>
            <Input
              name='lastName'
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm' htmlFor=''>
              Job Title
            </label>
            <Input
              name='jobTitle'
              defaultValue={resumeInfo?.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm' htmlFor=''>
              Address
            </label>
            <Input
              name='address'
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm' htmlFor=''>
              Phone
            </label>
            <Input
              name='phone'
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm' htmlFor=''>
              Email
            </label>
            <Input
              name='email'
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button disabled={loading} type='submit'>
            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailsForm;
