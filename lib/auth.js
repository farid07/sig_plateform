import React, {createContext, useContext, useEffect, useState,} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import firebase from './firebase';

// import {createUser} from './db';

const authContext = createContext();

export function AuthProvider({children}) {
    const auth = useFirebaseAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const formatAuthUser = async (user) => {
    const token = await user.getIdToken();
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        accountType: user?.accountType ? user.accountType : "admin",
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        token
    };
};

const formatNewOperator = async (user, newUserData) => {
    const token = await user.getIdToken();
    return {
        uid: user.uid,
        email: user.email,
        displayName: newUserData?.social_reason,
        social_reason: newUserData?.social_reason,
        ifu: newUserData?.ifu,
        accountType: newUserData?.accountType,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        token
    };
};

const formatNewUser = async (user, newUserData) => {
    const token = await user.getIdToken();
    return {
        uid: user.uid,
        email: user.email,
        displayName: newUserData?.first_name + " " + newUserData?.last_name,
        first_name: newUserData?.first_name,
        last_name: newUserData?.last_name,
        accountType: newUserData?.accountType,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        token
    };
};

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleNewUser = async (rawUser, newUserData) => {
        if (rawUser && newUserData) {

            const user = newUserData.accountType === "collaborator"? await formatNewUser(rawUser, newUserData): await formatNewOperator(rawUser, newUserData);
            const {token, ...userWithoutToken} = user;
            // await createUser(user.uid, userWithoutToken);
            setLoading(false);
            return user;
        }
    };

    const handleUser = async (rawUser, remember_me = false) => {
        if (rawUser) {
            const user = await formatAuthUser(rawUser);
            const {token, ...userWithoutToken} = user;

            setAuthUser(user);

            if (remember_me) {
                cookie.set('sig-valid', true, {
                    expires: 7
                });
            } else {
                cookie.set('sig-valid', true, {
                    expires: 1
                });
            }
            setLoading(false);
            return user;
        } else {
            setAuthUser(null);
            cookie.remove('sig-valid');
            setLoading(false);
            return false;
        }
    };

    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            await Router.push("/login/email")
            return;
        }

        setLoading(true)
        const formattedUser = await formatAuthUser(authState);
        setAuthUser(formattedUser);
        // console.log(authState)
        // await Router.push("/dashboard")
        setLoading(false);
    };

    const checkAuthUser = () => {
        if (!authUser) {
            setLoading(false)
            Router.push("/login/email")
        }

        Router.push("/dashboard")
    }


    const clear = () => {
        setLoading(true);
        setAuthUser(null);
        cookie.remove('sig-valid');
        setLoading(false);
    };

    const createUserWithEmailAndPassword = ({email, password, ...rest}) => {
        return firebase?.auth().createUserWithEmailAndPassword(email, password).then(async (response) => {
            await handleNewUser(response.user, rest);
        });
    }

    const updateUserProfile = async (data) => {
        setLoading(true)
        const user = firebase.auth().currentUser;
        // await handleNewUser(user, data)
    }

    const updateNewUserProfile = async (user, data) => {
        setLoading(true)
        await handleNewUser(user, data)
    }

    const resetUserPassword = async (email) => {
        setLoading(true)
        const auth = firebase.auth()
        return await auth.sendPasswordResetEmail(email).then((value) => {
            return true
        })
    }

    const deleteUser = async () => {
        setLoading(true)
        const user = firebase.auth().currentUser;
        return await user.delete().then((response) => {
                return response.user
            }
        )
    }

    const updateUserPassword = async (newPassword) => {
        setLoading(true)
        const user = firebase.auth().currentUser;
        return await user.updatePassword(newPassword).then((response) => {
            return true
        })
    }

    const signInWithEmailAndPassword = async (email, password, remember_me = false, redirect = '/dashboard') => {
        return await firebase.auth().signInWithEmailAndPassword(email, password).then(async (response) => {
            await handleUser(response.user, remember_me);
            if (redirect) {
                await Router.push(redirect);
            }
        });
    }

    const signOut = () => {
        return firebase?.auth().signOut().then(clear);
    }

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);

        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     checkAuthUser()
    // }, [])

    return {
        authUser,
        isAuthenticated: !!authUser,
        loading,
        setLoading,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        deleteUser,
        updateUserProfile,
        updateUserPassword,
        resetUserPassword,
        signOut
    };
}

