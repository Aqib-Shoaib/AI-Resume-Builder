import AddResume from "./components/AddResume";

function Dashboard() {
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p className="uppercase">
        Go on and create an awesome resume for your next job
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
      </div>
    </div>
  );
}

export default Dashboard;
