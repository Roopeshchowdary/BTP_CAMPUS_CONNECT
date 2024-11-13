import { Edit } from "lucide-react";
import DefaultProfileImage from "../../assets/profile_image.png";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { USER } from "../../store/USER_STORE/userActions";
import { toast } from "react-toastify";
import useStatus from "../../hooks/useStatus";
import uploadFile from "../../lib/uploadFile";

export default function ProfileImg({ isEditable, img, email }) {
  const [userImg, setUserImg] = useState(
    img ? img.length && img : DefaultProfileImage
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changingImg, setChangingImg] = useState(userImg);
  const [finalImg, setFinalImg] = useState();
  const { isLoading, setLoading, setIdle } = useStatus();

  const handleProfileUpdate = () => {
    //open a file picker
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      setFinalImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setChangingImg(reader.result);
      };
    });
  };

  function imgComponent(imageUrl) {
    return (
      <div className="img-wrapper rounded-full overflow-hidden bg-red-100 w-full border-2 h-100">
        <img src={imageUrl} alt="" className="w-full h-auto" />
      </div>
    );
  }

  async function changeUserImg() {
    if (!finalImg) {
      setDialogOpen(false);
      return;
    }

    setLoading();
    try {
      const url = await uploadFile(finalImg, `user_images/${email}`);
      await USER.updateUser({ photoURL: url });
      toast("Successfully updated user profile");
      setUserImg(url);
    } catch (error) {
      toast("Unable to update your profile");
    } finally {
      setIdle();
      setDialogOpen(false);
    }
  }

  return (
    <div className="img lg:w-1/4 w-1/3 relative group">
      {isEditable && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className=" opacity-0 group-hover:opacity-100 absolute bottom-0 right-0 bg-slate-500 text-white hover:bg-blue-500 rounded-full p-2 transition-all duration-300 ease-in-out ">
            <Edit size={20} />
          </DialogTrigger>

          <DialogContent>
            <div className="flex flex-col justify-between w-100 gap-10">
              <div className="flex gap-4 items-center justify-between">
                <div className="w-1/2">{imgComponent(changingImg)}</div>
                <Button
                  className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                >
                  Choose image
                </Button>
              </div>

              <div className="w-100 flex justify-between items-center">
                <Button
                  disabled={isLoading}
                  className="w-100 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-500"
                  onClick={() => {
                    changeUserImg();
                  }}
                >
                  Save
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {imgComponent(userImg)}
    </div>
  );
}
