import {Grid} from "@mui/material";
import * as React from 'react';
import ControlledSelection, {ITreeData} from "../components/ControlledSelection";

export const mockDepartments = ['pollo', 'cerdo', 'carne'];
export const mockProducts: ITreeData = {
    carne: ['asado', 'matambre', 'lomo'],
    cerdo: ['solomillo'],
    pollo: ['pechuga', 'patamuslo']
}

export function FilterSelector({setSelection, selectedFilters}: { setSelection: Function, selectedFilters: string[] }) {
    return <Grid container spacing={2} my={5} style={{maxWidth:"200px"}} hidden={true}>
        <ControlledSelection tree={mockProducts} setSelection={setSelection} selectedFilters={selectedFilters}/>
    </Grid>
}