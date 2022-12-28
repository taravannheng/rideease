import { FC, FormEvent, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../../input/index.component";
import Button from "../../button/index.component";
import Divider from "../../divider/index.component";
import ImgGoogleLogo from "../../../assets/logos/google.svg";
import * as ROUTES from "../../../utils/constants/routes";
import {
  checkEmail,
  checkPassword,
  checkMatchedPassword,
} from "../../../utils/validators/validator";

interface AuthFormProps {
  type: "sign up" | "sign in";
}

interface AuthState {
  email: { value: string; isValid: null | boolean };
  password: { value: string; isValid: null | boolean };
  confirmPassword: { value: string; isMatched: null | boolean };
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  // STATES
  const [authState, setAuthState] = useState<AuthState>({
    email: { value: "", isValid: null },
    password: { value: "", isValid: null },
    confirmPassword: { value: "", isMatched: null },
  });
  const [showSuggestion, setShowSuggestion] = useState(false);

  // ROUTES
  const navigate = useNavigate();

  // FIREBASE
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();

  // FORM HANDLERS
  const inputSuggestionHandler = (e: FormEvent) => {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.id === "input-password") {
      setShowSuggestion(true);
    }
  };

  const inputChangeHandler = (e: FormEvent) => {
    const inputElement = e.target as HTMLInputElement;
    const inputVal = inputElement.value;

    // update input
    switch (inputElement.id) {
      case "input-email":
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          email: { value: inputVal, isValid: null },
        }));
        break;
      case "input-password":
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          password: { value: inputVal, isValid: null },
        }));
        break;
      case "input-confirm-password":
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          confirmPassword: { value: inputVal, isMatched: null },
        }));
        break;
      default:
        return;
    }
  };

  const inputCheckHandler = (e: FormEvent) => {
    const inputElement = e.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // hide suggestion
    setShowSuggestion(false);

    // update input
    switch (inputElement.id) {
      case "input-email":
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          email: { value: inputValue, isValid: checkEmail(inputValue) },
        }));
        break;
      case "input-password":
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          password: { value: inputValue, isValid: checkPassword(inputValue) },
        }));
        break;
      case "input-confirm-password":
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          confirmPassword: {
            value: inputValue,
            isMatched: checkMatchedPassword(
              authState.password.value,
              inputValue
            ),
          },
        }));
        break;
    }
  };

  const signUpSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        authState.email.value,
        authState.password.value
      );
      navigate(ROUTES.BOOK);
    } catch (error: any) {
      const errorCode = error.code;
      let messageType = "default";
      let message = "";

      switch (errorCode) {
        case "auth/email-already-in-use":
          messageType = "error";
          message = "An account with this email already exist.";
          break;
        case "auth/invalid-email":
          messageType = "error";
          message = "Email is invalid!";
          break;
        case "auth/weak-password":
          messageType = "warn";
          message = "Password is weak!";
          break;
      }

      notify(messageType, message);
    }
  };

  const signInSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        authState.email.value,
        authState.password.value
      );
      navigate(ROUTES.BOOK);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      let messageType = "default";
      let message = "";

      switch (errorCode) {
        case "auth/email-already-in-use":
          messageType = "error";
          message = "An account with this email already exist.";
          break;
        case "auth/invalid-email":
          messageType = "error";
          message = "Email is invalid!";
          break;
        case "auth/weak-password":
          messageType = "warn";
          message = "Password is weak!";
          break;
        case "auth/user-not-found":
          messageType = "error";
          message = "User not found!";
          break;
        default:
          messageType = "error";
          message = errorMessage;
      }

      notify(messageType, message);
    }
  };

  const googleSignInHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      navigate(ROUTES.BOOK);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      notify("error", errorMessage);
    }
  };

  // TOAST
  const notify = (type: string, message: string) => {
    switch (type) {
      case "info":
        toast.info(message);
        break;
      case "success":
        toast.success(message);
        break;
      case "warn":
        toast.warn(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <section className="auth flex flex-col lg:flex-row lg:h-[52rem]">
      <div className="auth__img hidden lg:basis-7/12 lg:block p-8 pr-0">
        <div className="bg-auth-banner bg-center bg-cover w-full h-full"></div>
      </div>
      <div className="auth__form px-8 basis-full lg:basis-5/12 lg:mb-32">
        <form
          onSubmit={
            type === "sign up" ? signUpSubmitHandler : signInSubmitHandler
          }
        >
          <ToastContainer />
          <h1 className="text-h4 text-neutral-dark mt-16 lg:mt-32 mb-8">
            SIGN {type === "sign up" ? "UP" : "IN"}
          </h1>
          <Input
            id="input-email"
            name="email"
            type="email"
            required
            className="mb-4"
            showSuggestion={showSuggestion}
            hideSuggestion
            value={authState.email.value}
            isValid={authState.email.isValid}
            onChange={inputChangeHandler}
            onBlur={inputCheckHandler}
            onFocus={inputSuggestionHandler}
          />
          <Input
            id="input-password"
            name="password"
            type="password"
            required
            className="mb-4"
            showSuggestion={showSuggestion}
            value={authState.password.value}
            isValid={authState.password.isValid}
            onChange={inputChangeHandler}
            onBlur={inputCheckHandler}
            onFocus={inputSuggestionHandler}
          />
          <Input
            id="input-confirm-password"
            name="password"
            type="password"
            label="Confirm Password"
            required
            className="mb-8"
            showSuggestion={showSuggestion}
            hideSuggestion
            value={authState.confirmPassword.value}
            isValid={authState.confirmPassword.isMatched}
            onChange={inputChangeHandler}
            onBlur={inputCheckHandler}
            onFocus={inputSuggestionHandler}
            errorMessage="Password not match!"
          />
          <Button
            buttonStyle="primary"
            type="submit"
            className="mb-4"
            disabled={
              authState.email.isValid === true &&
              authState.password.isValid === true
                ? false
                : true
            }
          >
            {type === "sign up" ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        {type === "sign in" && (
          <Button
            buttonStyle="secondary"
            type="submit"
            className="mb-4"
            imageSource={ImgGoogleLogo}
            onClick={googleSignInHandler}
          >
            Sign In with Google
          </Button>
        )}

        <Divider className="mb-2">OR</Divider>
        {type === "sign up" && (
          <Button
            buttonStyle="secondary"
            type="submit"
            className="mb-4"
            imageSource={ImgGoogleLogo}
            onClick={googleSignInHandler}
          >
            Sign In with Google
          </Button>
        )}

        <Button
          buttonStyle="secondary"
          type="submit"
          className="mb-4"
          route={type === "sign up" ? ROUTES.SIGNIN : ROUTES.SIGNUP}
        >
          {type === "sign up" ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </section>
  );
};

export default AuthForm;
