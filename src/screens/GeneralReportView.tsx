import {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import {
    FilterCategories,
    GeneralReportByProduct,
    Granularities,
    IFilter,
    Row
} from "../components/graphs/GeneralReportByProduct";
import {FilterSelector} from "./FilterSelector";
import {isCategory} from "../components/ControlledSelection";

const buildCode = ({departamento, producto}: { departamento: string, producto: string }) => {
    return `${departamento}-${producto}`
}
const rows: Row[] = [{
    id: '1',
    producto: 'lomo',
    departamento: 'carne',
    ticketCantidad: 10,
    vendidoCant: 50,
    precio: 8000,
    fecha: new Date('2024-01-01'),
}, {
    id: '2',
    producto: 'asado',
    departamento: 'carne',
    ticketCantidad: 8,
    vendidoCant: 60,
    precio: 6000,
    fecha: new Date('2024-01-01')
}, {
    id: '3',
    producto: 'pechuga',
    departamento: 'pollo',
    ticketCantidad: 14,
    vendidoCant: 20,
    precio: 3000,
    fecha: new Date('2024-01-01')
}]

const GeneralReportView = () => {
    const [granularity, setGranularity] = useState<Granularities>(Granularities.GENERAL)
    const [filter, setFilter] = useState<IFilter | undefined>()
    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const filterRows = () => {
        if (filter?.key === FilterCategories.DEPARTAMENTO && !!filter.value) {
            return rows.filter(row => row.departamento === filter.value)
        } else {
            if (filter?.key === FilterCategories.PRODUCTO && !!filter.value.length) {
                return rows.filter(r => filter.value.includes(buildCode(r)))
            }
        }
        return rows
    }

    const setSelection = (selection: string[]) => {
        const selectedCategories = selection.filter(isCategory)
        if (selectedCategories.length === 1) {
            setFilter({key: FilterCategories.DEPARTAMENTO, value: selectedCategories[0]})
        } else if (selection.length === 1){
            setFilter({key: FilterCategories.PRODUCTO, value: selection})
        }
        else if (selection.length === 0){
            setFilter(undefined)
        } else {
            setFilter({key: FilterCategories.DEPARTAMENTO, value: selection})
        }
    }

    return (
        <Container disableGutters>
            <Grid container spacing={2} my={5}>
                <FilterSelector setSelection={setSelection}/>
            </Grid>
            <Grid container spacing={2} my={5}>
                <GeneralReportByProduct granularity={granularity} filter={filter} rows={filterRows()}/>
            </Grid>
        </Container>
    );
};

export default GeneralReportView;
