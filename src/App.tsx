import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {auth} from "./config/firebase";
import routes from "./config/Routes";
import Center from "./components/utils/Center";
import AuthChecker from "./components/auth/AuthChecker";
import {UserContext} from "./helpers/UserContext";
import {NotificationContext} from "./helpers/NotificationContext";
import withRoot from "./components/withRoot";
import {IUser} from "./shared/user";

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<IUser>({} as IUser);
    const [notification, setNotificationInfo] = useState({
        visible: false,
        notificationProps: {},
        notificationText: ''
    });
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.info("User detected.");
            } else {
                console.info("No user detected");
            }
            setLoading(false);
        });
    }, []);

    const setNotification = (notificationText: string, notificationProps: any) => {
        if (!notification.visible) {
            setNotificationInfo({
                notificationProps,
                notificationText,
                visible: true
            });
            setTimeout(() => {
                setNotificationInfo({
                    ...notification,
                    visible: false
                });
            }, 10000);
        }
    };

    if (loading)
        return (
            <Center>
                <CircularProgress/>
            </Center>
        );


    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <UserContext.Provider value={{user, setUser}}>
                    <NotificationContext.Provider value={{...notification, setNotification}}>
                        <Routes>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        route.protected ? (
                                            <AuthChecker>
                                                <route.component/>
                                            </AuthChecker>
                                        ) : (
                                            <route.component/>
                                        )
                                    }
                                />
                            ))}
                        </Routes>
                    </NotificationContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default withRoot(App);
