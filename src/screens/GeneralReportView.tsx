import {useEffect} from "react";
import {Container, Grid} from "@mui/material";
import {GeneralReportByProduct} from "../components/graphs/GeneralReportByProduct";


const GeneralReportView = () => {
    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container disableGutters>
            <Grid container spacing={2} my={5}>
                <GeneralReportByProduct/>
            </Grid>
        </Container>
    );
};

export default GeneralReportView;
