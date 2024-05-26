import {Button, Grid} from "@mui/material";

export const mockDepartments = ['pollo', 'cerdo', 'carne'];

export function FilterSelector({handleDepartmentClick}: { handleDepartmentClick: Function }) {
    return <Grid container spacing={2} my={5}>
        {mockDepartments.map(d =>
            <Grid item key={d}><Button onClick={() => handleDepartmentClick(d)}>{d}</Button></Grid>
        )}
    </Grid>
}