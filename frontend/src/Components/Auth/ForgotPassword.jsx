import React, { useCallback, useState } from "react";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import useFirebase from "../../hooks/useFirebase";
import BackwardArrow from "../../assets/backward_arrow.png";
import FloatingLabelInput from "../Utils/FloatingLabelInput";

const ForgotPassword = ({ signIn }) => {
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { passwordReset } = useFirebase();

  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      setIsLoading(true);
      try {
        await passwordReset(email);
        signIn();
        toast("Password reset Link sent on your email");
      } catch (error) {
        setIsLoading(false);
        if (error.code == "auth/user-not-found") {
          setIsError(true);
        } else {
          toast("Unable to send a password reset link");
        }
      }
      setEmail("");
    },
    [email, setEmail, setIsError, setIsLoading]
  );

  return (
    <div className="h-fit rounded-lg bg-white p-7 relative">
      <div>
        <p className="text-xs">DONT WORRY! YOUR ACCOUNT IS SAFE</p>
        <div className="flex justify-start gap-1 items-center">
          <img
            src={BackwardArrow}
            alt="back"
            className="w-6 h-6 cursor-pointer"
            onClick={signIn}
          />
          <h2 className="text-2xl font-semibold my-3">Reset your Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FloatingLabelInput
              id="email"
              type="email"
              placeholder="Email"
              onChange={(ev) => setEmail(ev.target.value)}
              value={email}
              required
            />
          </div>
          <Button type="submit" color="dark" className="w-full font-medium">
            Reset
          </Button>
          {isError ? (
            <p className="text-center text-xs text-red-600 font-bold my-2">
              Unable to find account
            </p>
          ) : null}
        </form>
        {isLoading ? <AbsoluteSpinner /> : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
