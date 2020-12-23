import React, { FC, useCallback, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import Button from "../../primitives/components/Button";
import { AppStore } from "../../store/store";

const LoginPage: FC = () => {
  const { dispatch } = useContext(AppStore);

  const history = useHistory();

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          history.push("/dashboard");
        }
      }),
    [history]
  );

  const handleClick = useCallback(() => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        const uid = firebase.auth().currentUser?.uid;
        dispatch({ type: "SET_UID", payload: uid });
        history.push("/dashboard");
      });
  }, [dispatch, history]);

  return (
    <Button onClick={handleClick} type="button">
      Sign with Google
    </Button>
  );
};

export default LoginPage;
