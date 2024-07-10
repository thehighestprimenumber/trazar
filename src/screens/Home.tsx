import {ReactNode, useEffect} from "react";
import {Box, Container, Grid, Paper} from "@mui/material";
import LineByDate from "../components/graphs/LineChart/LineaPorFecha";
import MyResponsiveBar from "../components/graphs/MyResponsiveBar";
import GroupedChartByStore from "../components/graphs/GroupedChart";


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
            <Box sx={{width: '80vw', height: '80vh'}}>
                <Grid container spacing={2} my={5}>
                    {/*<DashboardCard>*/}
                    {/*    <LineChart data={}/>*/}
                    {/*</DashboardCard>*/}
                    <DashboardCard>
                        <GroupedChartByStore/>
                    </DashboardCard>
                    <DashboardCard>
                        <LineByDate/>
                    </DashboardCard>
                </Grid>
            </Box>
        </Container>);
};

export default Home;
