import React, { FC, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./utils/constants/routes";

import LandingPage from "./routes/landing/index.component";

// LAZY LOADING
const SignUpPage = React.lazy(() => import("./routes/signup/index.component"));

const App: FC = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;
