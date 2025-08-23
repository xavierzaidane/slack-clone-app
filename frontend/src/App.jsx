import React from 'react'
import * as Sentry from "@sentry/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {
  
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
  return (
    <>
      <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
      </SignedIn>

       <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </SentryRoutes>
      </SignedOut>
    </>
  )
}

export default App