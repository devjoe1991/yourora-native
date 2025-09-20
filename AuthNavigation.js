import React, { useContext } from "react";
import { SignedOutStack, SignedInStack } from "./navigation";
import { AuthContext } from "./store/auth-context";

const AuthNavigation = () => {
  const authCtx = useContext(AuthContext);

  // Temporarily bypass authentication - always show main app
  return <SignedInStack />;
  
  // Original code (commented out for now):
  // return (
  //   <>{authCtx.isAuthenticated ? <SignedInStack /> : <SignedOutStack />}</>
  // );
};

export default AuthNavigation;
