import {useState} from "react";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth, Providers} from "../../config/firebase";
import {Button, Typography} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";
import {Paths} from "../../config/Routes";

interface Props {
}

const AuthContainer = (props: Props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);

    const signInWithGoogle = () => {
        setDisabled(true);
        signInWithPopup(auth, Providers.google)
            .then(() => {
                setDisabled(false);
                navigate(Paths.Home);
            })
            .catch((error) => {
                setErrorMessage(error.code + ": " + error.message);
                setDisabled(false);
            });
    };

    return (
        <Center height={"auto"}>
            <Button
                startIcon={<GoogleIcon/>}
                size="large"
                disabled={disabled}
                variant="contained"
                onClick={signInWithGoogle}
            >
                Sign In With Google
            </Button>
            <Typography sx={{mt: 2}} color={"red"}>
                {errorMessage}
            </Typography>
        </Center>
    );
};

export default AuthContainer;
