import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../services/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
import { Loader } from "lucide-react";

function Dashboard() {
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(
    function () {
      const getUserResumes = () => {
        GlobalApi.getUserResumes(userEmail).then((res) => {
          setResumeList(res.data.data);
          setLoading(false);
        });
      };
      isLoaded && getUserResumes();
    },
    [isLoaded, userEmail]
  );

  // early return before content loads
  if (loading)
    return (
      <div className='h-[100vh] flex items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );

  resumeList.map((res) => console.log(res));
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resumes</h2>
      <p className='uppercase'>
        Go on and create an awesome resume for your next job
      </p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <AddResume />

        {resumeList.length > 0
          ? resumeList.map((res) => <ResumeItem key={res.id} resume={res} />)
          : "failed"}
      </div>
    </div>
  );
}

export default Dashboard;
