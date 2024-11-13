import { Button } from "flowbite-react";
import React, { useCallback, useState, useEffect } from "react";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import useFirebase from "../../hooks/useFirebase";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { toast } from "react-toastify";
import FloatingLabelInput from "../Utils/FloatingLabelInput";
import { authErrorMessages } from "../../Firebase/errorCodes";
import useStatus from "../../hooks/useStatus";
import { useNavigate } from "react-router-dom";

const Signup = ({ signIn: nextStep }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setIdle, setLoading } = useStatus();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { signUp, googleSignIn, facebookSignIn, signIn } = useFirebase();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading();

      try {
        await signUp(name, email, password);
        await signIn(email, password);
        toast("Verifiy your email before singin!");
      } catch (err) {
        console.log(err.code);
        setError(err.code);
      } finally {
        setIdle();
      }
    },
    [name, email, password, setLoading, setError]
  );

  useEffect(() => {
    setError(null);
  }, [name, email, password]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await googleSignIn();
      navigate("/blogs");
    } catch (err) {
      console.log(err);
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

  return (
    <div className=" h-fit rounded-lg bg-white p-7 relative">
      <div>
        <p className="text-xs">LET'S GET YOU STARTED</p>
        <h2 className="text-2xl font-semibold my-3">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FloatingLabelInput
              id="name"
              type="text"
              placeholder="Name"
              onChange={(ev) => setName(ev.target.value)}
              value={name}
              isRequired={true}
            />
          </div>
          <div className="mb-4">
            <FloatingLabelInput
              id="email"
              type="text"
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
          <Button
            type="submit"
            color="dark"
            className="w-full font-medium"
            disabled={isLoading}
          >
            GET STARTED
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
          <span className="text-sm font-medium">Signup with Google</span>
        </GoogleLoginButton>
        <FacebookLoginButton
          className="scale-y-90"
          onClick={handleFacebookLogin}
        >
          <span className="text-sm font-medium">Signup with Facebook</span>
        </FacebookLoginButton>
        <p className="text-xs font-light text-center mt-3">
          Already have an account?{" "}
          <span>
            <button className="font-bold" onClick={nextStep}>
              Login Here
            </button>
          </span>
        </p>
      </div>
      {isLoading ? <AbsoluteSpinner /> : null}
    </div>
  );
};

export default Signup;
