import {ReactNode, useEffect} from "react";
import Interpolation from "../components/graphs/Interpolation";
import ColumnChart from "../components/graphs/ColumnChart";
import {Container, Grid, Paper} from "@mui/material";


function DashboardCard({children}: { children: ReactNode }) {
    return <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center" alignItems="center">
        <Paper square={false} elevation={10} style={{height: '40vh', width: '100%', minWidth: '300px'}}>
            {children}
        </Paper></Grid>;
}

const Home = () => {
    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container disableGutters>
            <Grid container spacing={2} my={5}>
                <DashboardCard>
                    <Interpolation/>
                </DashboardCard>
                <DashboardCard>
                    <ColumnChart/>
                </DashboardCard>
            </Grid>
        </Container>
    );
};

export default Home;
