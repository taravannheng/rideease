import React, { FC, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "@stripe/stripe-js";

import LandingPage from "./routes/landing/index.component";
import PrivateAuthRoute from "./routes/private-auth/index.component";
import PrivateBookingRoute from "./routes/private-booking/index.component";
import PrivateCartRoute from "./routes/private-cart/index.component";
import PrivatePaymentSuccessRoute from "./routes/private-payment-success/index.component";
import * as ROUTES from "./utils/constants/routes";
import firebaseConfig from "./utils/firebase/firebase-config";
import { UserContextProvider } from "./contexts/user-context";
import { CartContextProvider } from "./contexts/cart-context";
import { ProductContextProvider } from "./contexts/product-context";
import ProgressIndicator from "./components/progress-indicator/index.component";

// LAZY LOADING
const SignUpPage = React.lazy(() => import("./routes/signup/index.component"));
const SignInPage = React.lazy(() => import("./routes/signin/index.component"));
const BookingPage = React.lazy(
  () => import("./routes/booking/index.component")
);
const CartPage = React.lazy(() => import("./routes/cart/index.component"));
const NotFoundPage = React.lazy(
  () => import("./routes/notfound/index.component")
);
const PaymentSuccessPage = React.lazy(
  () => import("./routes/payment-success/index.component")
);

// Initialize Firebase
initializeApp(firebaseConfig);

const App: FC = () => {
  return (
    <ProductContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Router>
            <Routes>
              <Route path={ROUTES.HOME} element={<LandingPage />} />
              <Route
                path={ROUTES.SIGNUP}
                element={
                  <Suspense fallback={<ProgressIndicator />}>
                    <SignUpPage />
                  </Suspense>
                }
              />
              <Route path={ROUTES.SIGNIN} element={<PrivateAuthRoute />}>
                <Route
                  path={ROUTES.SIGNIN}
                  element={
                    <Suspense fallback={<ProgressIndicator />}>
                      <SignInPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path={ROUTES.BOOKING} element={<PrivateBookingRoute />}>
                <Route
                  path={ROUTES.BOOKING}
                  element={
                    <Suspense fallback={<ProgressIndicator />}>
                      <BookingPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path={ROUTES.CART} element={<PrivateCartRoute />}>
                <Route
                  path={ROUTES.CART}
                  element={
                    <Suspense fallback={<ProgressIndicator />}>
                      <CartPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path={ROUTES.NOTFOUND}
                element={
                  <Suspense fallback={<ProgressIndicator />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.PAYMENT_SUCCESS}
                element={<PrivatePaymentSuccessRoute />}
              >
                <Route
                  path={ROUTES.PAYMENT_SUCCESS}
                  element={
                    <Suspense fallback={<ProgressIndicator />}>
                      <PaymentSuccessPage />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </CartContextProvider>
      </UserContextProvider>
    </ProductContextProvider>
  );
};

export default App;
