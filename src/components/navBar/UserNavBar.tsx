import React, {useContext} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import {styles} from './UserNavBar.styles';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../../helpers/UserContext";
import {IUser} from "../../shared/user";
import {auth} from "../../config/firebase";
import {Paths} from "../../config/Routes";

export default function UserNavBar() {
    const {user}: { user: IUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => auth.signOut().then(() => navigate(Paths.Home));
    return (
        <Grid container sx={styles.panelContainer}>
            <Grid item xs={12} md={3} sx={styles.accountInfoContainer}>
                <AccountCircle sx={styles.accountIcon}/>
                <Box sx={styles.accountInfo}>
                    {/*<Typography variant={'h6'} noWrap>*/}
                    {/*  {user.data?.nameFirst}*/}
                    {/*</Typography>*/}
                    <Typography variant={'h6'} noWrap>
                        {user.email}
                    </Typography>
                </Box>
            </Grid>
            {[{path: Paths.Home, label: 'Inicio'}, {path: Paths.GeneralReport, label: 'Reporte General'}]
                .map(({path, label}) =>
                    <Grid item xs={12} md={6} lg={3}>
                        <Button variant='outlined' sx={styles.panelTitle} href={path} key={'profile'}>
                            {label}
                        </Button>
                    </Grid>
                )}
            <Grid item xs={12} md sx={styles.panelTitleContainer}>
                <Button color={'secondary'} variant={'contained'} onClick={() => logout()} key={'signout'}>
                    Cerrar Sesión
                </Button>
            </Grid>
        </Grid>
    );
}
