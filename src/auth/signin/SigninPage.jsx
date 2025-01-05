import { SignIn } from "@clerk/clerk-react";

function SigninPage() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <SignIn />
    </div>
  );
}

export default SigninPage;
