import React from "react";
import { Heading } from "@shopify/polaris";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";

export default function login() {
  const handleClick = async () => {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  };

  return (
    <div className="center">
      <Heading>You're not signed in. please sign in first</Heading>
      <GoogleButton onClick={handleClick} />
    </div>
  );
}
