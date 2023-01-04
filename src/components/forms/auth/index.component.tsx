import { FC, FormEvent, useState, useContext } from "react";
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
import UserContext from "../../../contexts/user-context";

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

  // CONTEXTS
  const { setUserState } = useContext(UserContext);

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
      const result = await createUserWithEmailAndPassword(
        auth,
        authState.email.value,
        authState.password.value
      );
      setUserState(result);
      localStorage.setItem("ls-user-state", JSON.stringify(result));
      navigate(ROUTES.BOOKING);
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
      const result = await signInWithEmailAndPassword(
        auth,
        authState.email.value,
        authState.password.value
      );
      setUserState(result);
      localStorage.setItem("ls-user-state", JSON.stringify(result));
      navigate(ROUTES.BOOKING);
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
      setUserState(credential);
      localStorage.setItem("ls-user-state", JSON.stringify(credential));
      navigate(ROUTES.BOOKING);
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
    <section className="auth flex flex-col lg:h-[52rem] lg:flex-row">
      <div className="auth__img hidden p-8 pr-0 lg:block lg:basis-7/12">
        <div className="h-full w-full bg-auth-banner bg-cover bg-center"></div>
      </div>
      <div className="auth__form basis-full px-8 lg:mb-32 lg:basis-5/12">
        <form
          onSubmit={
            type === "sign up" ? signUpSubmitHandler : signInSubmitHandler
          }
        >
          <ToastContainer />
          <h1 className="mt-16 mb-8 text-h4 text-neutral-dark lg:mt-32">
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
