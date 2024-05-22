import React, {useEffect, useState} from 'react';
import {Paths} from "../config/Routes";
import {Navigate} from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {auth, uiConfig} from '../config/firebase';
import {IUser} from "../shared/user";

const AuthForm = () => {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        // @ts-ignore
        const unregisterAuthObserver = auth.onAuthStateChanged((user: IUser) => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>Inicie Sesión</p>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>

            </div>
        );
    }
    return <Navigate to={Paths.Home}/>;
};

export default AuthForm;
