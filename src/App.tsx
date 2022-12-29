import React, { FC, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";

import LandingPage from "./routes/landing/index.component";
import * as ROUTES from "./utils/constants/routes";
import firebaseConfig from "./utils/firebase/firebase-config";
import { UserContextProvider } from "./contexts/user-context";
import { CartContextProvider } from "./contexts/cart-context";

// LAZY LOADING
const SignUpPage = React.lazy(() => import("./routes/signup/index.component"));
const SignInPage = React.lazy(() => import("./routes/signin/index.component"));
const BookingPage = React.lazy(
  () => import("./routes/booking/index.component")
);

// Initialize Firebase
initializeApp(firebaseConfig);

const App: FC = () => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route
              path={ROUTES.SIGNUP}
              element={
                <Suspense fallback={<>...</>}>
                  <SignUpPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.SIGNIN}
              element={
                <Suspense fallback={<>...</>}>
                  <SignInPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.BOOKING}
              element={
                <Suspense fallback={<>...</>}>
                  <BookingPage />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </CartContextProvider>
    </UserContextProvider>
  );
};

export default App;
