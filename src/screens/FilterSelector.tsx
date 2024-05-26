import {Grid} from "@mui/material";
import * as React from 'react';
import ControlledSelection, {ITreeData} from "../components/ControlledSelection";

export const mockDepartments = ['pollo', 'cerdo', 'carne'];
export const mockProducts: ITreeData = {
    carne: ['asado', 'matambre', 'lomo'],
    cerdo: ['solomillo'],
    pollo: ['pechuga', 'patamuslo']
}

export function FilterSelector({setSelection}: { setSelection: Function }) {
    return <Grid container spacing={2} my={5}>
        <ControlledSelection tree={mockProducts} setSelection={setSelection}/>
    </Grid>
}