import React, { useState, useEffect, useContext, createContext, } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import {auth as firebase_auth} from './firebase';
import { createUser } from './db';

import {Container, Row, Col} from 'reactstrap';
import {Firebase} from "firebase/app";

const authContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
});

// lien --> https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('fast-feedback-auth', true, {
        expires: 1
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove('fast-feedback-auth');

      setLoading(false);
      return false;
    }
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    return firebase_auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push('/sites');
      });
  };


  const signout = () => {
    Router.push('/');

    return firebase_auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase_auth.onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    // signinWithGitHub,
    // signinWithGoogle,
    signout
  };
}

const formatUser = async (user) => {
  // const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    // name: user.displayName,
    // provider: user.providerData[0].providerId,
    // photoUrl: user.photoURL,
    // stripeRole: await getStripeRole(),
    // token
  };
};


export default function useFirebaseAuth() {
  // ...
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email, password) =>
      Firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
      Firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () =>
      Firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
  };
}



{/*
    const signinWithGitHub = (redirect) => {
    setLoading(true);
    return firebase_auth.signInWithPopup(new firebase_auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  */}

{/*
    const signinWithGoogle = (redirect) => {
    setLoading(true);
    return firebase_auth.signInWithPopup(new firebase_auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };
  */}

{/*
  const getStripeRole = async () => {
  await firebase_auth.currentUser.getIdToken(true);
  const decodedToken = await firebase_auth.currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole || 'free';
};

*/}



