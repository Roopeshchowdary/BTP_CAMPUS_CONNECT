import React, { useState } from "react";
import Signin from "./Signin";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";

const FORMS = {
  SIGNUP: "SIGNUP",
  SIGNIN: "SIGNIN",
  FORGOT_PASSWORD: "FORGOT-PASSWORD",
};

const Auth = () => {
  const [form, setForm] = useState(FORMS.SIGNIN);

  if (form.localeCompare(FORMS.SIGNUP) === 0) {
    return <Signup signIn={() => setForm(FORMS.SIGNIN)} />;
  } else if (form.localeCompare(FORMS.SIGNIN) === 0) {
    return (
      <Signin
        singUp={() => setForm(FORMS.SIGNUP)}
        forgotPassword={() => setForm(FORMS.FORGOT_PASSWORD)}
      />
    );
  } else {
    return <ForgotPassword signIn={() => setForm(FORMS.SIGNIN)} />;
  }
};

export default Auth;
