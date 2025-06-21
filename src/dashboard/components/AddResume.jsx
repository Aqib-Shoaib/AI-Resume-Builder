import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [open, setOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        Title: resumeTitle,
        resumeid: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.createNewResume(data)
      .then((res) => {
        console.log(res);
        if (res) {
          setLoading(false);
          setOpen(false);
          navigate(`/dashboard/resume/${res.data.data.documentId}/edit`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      {/* dialog trigger btn */}
      <div
        className='border flex items-center justify-center bg-secondary rounded-lg h-[200px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpen(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={open}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ready to create a new resume?</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new Resume</p>
              <Input
                className='my-2'
                placeholder='e.g Full Stack Dev'
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            {/* btns */}
            <div className='flex justify-end gap-5'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={onCreate}
                disabled={resumeTitle === "" || loading}
              >
                {loading ? <Loader2 className='animate-spin' /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
