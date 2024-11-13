import { Button, Checkbox, Label } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import useFirebase from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { toast } from "react-toastify";
import FloatingLabelInput from "../Utils/FloatingLabelInput";
import { authErrorMessages } from "../../Firebase/errorCodes";
import useStatus from "../../hooks/useStatus";

const Signin = ({ singUp, forgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setIdle, setLoading } = useStatus();
  const [error, setError] = useState(false);
  const { signIn, googleSignIn, facebookSignIn } = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading();

      try {
        await signIn(email, password);
        navigate("/blogs");
      } catch (err) {
        console.log(err.code);
        setError(err.code);
      } finally {
        setIdle();
      }
    },
    [email, password, setError, setIdle, setLoading]
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      await googleSignIn();
      navigate("/blogs");
    } catch (err) {
      console.log(err.code);
      toast("Unable to do Google login");
    }
  }, []);

  const handleFacebookLogin = useCallback(async () => {
    try {
      await facebookSignIn();
      navigate("/blogs");
    } catch (err) {
      console.log(err.code);
      toast("Unable to do Facebook login");
    }
  }, []);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  return (
    <div className="h-fit rounded-lg bg-white p-7 relative">
      <p className="text-xs">WELCOME BACK</p>
      <h2 className="text-2xl font-semibold my-3">Log into your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FloatingLabelInput
            id="email"
            type="email"
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            isRequired={true}
          />
        </div>
        <div className="mb-4">
          <FloatingLabelInput
            id="password"
            type="password"
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
            isRequired={true}
          />
        </div>
        <div className="flex justify-between items-center my-4">
          <div className="flex justify-start items-center gap-2">
            <Checkbox id="remember" />
            <Label className="font-semibold text-xs">Remember me</Label>
          </div>
          <p className="text-xs cursor-pointer" onClick={forgotPassword}>
            Forgot Password?
          </p>
        </div>
        <Button
          type="submit"
          color="dark"
          className="w-full font-medium"
          disabled={isLoading}
        >
          CONTINUE
        </Button>
        {error ? (
          <p className="text-center text-xs text-red-600 font-bold my-2">
            {authErrorMessages[error]}
          </p>
        ) : null}
      </form>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          or
        </span>
      </div>
      <GoogleLoginButton className="scale-y-90" onClick={handleGoogleLogin}>
        <span className="text-sm font-medium">Log in with Google</span>
      </GoogleLoginButton>
      <FacebookLoginButton className="scale-y-90" onClick={handleFacebookLogin}>
        <span className="text-sm font-medium">Log in with Facebook</span>
      </FacebookLoginButton>
      <p className="text-xs font-light text-center mt-3">
        New user?{" "}
        <span>
          <button className="font-bold" onClick={singUp}>
            SIGN UP HERE
          </button>
        </span>
      </p>
      {isLoading ? <AbsoluteSpinner /> : null}
    </div>
  );
};

export default Signin;
