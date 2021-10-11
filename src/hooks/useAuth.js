import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState((user) => {
    return {
      initializing: true,
      user,
    };
  });

  useEffect(() => {
    async function onChange(user) {
      if (user && user.uid) {
        try {
          setState({ initializing: false, user });
          dispatch({
            type: "login_user",
            payload: user,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        setState({ initializing: false });
      }
    }

    // listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, [dispatch]);

  return state;
};

export default useAuth;
