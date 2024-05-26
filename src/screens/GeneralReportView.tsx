import {useState} from "react";
import {Button, Container, Grid} from "@mui/material";
import {
    FilterCategories,
    GeneralReportByProduct,
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
    const [filter, setFilter] = useState<IFilter | undefined>()
    const [showFilters, setShowFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const filterRows = () => {
        debugger
        if (filter?.key === FilterCategories.DEPARTAMENTO && !!filter.value) {
            return rows.filter(row => row.departamento === filter.value)
        } else {
            if (!!filter?.value.length) {
                return rows.filter(r => filter.value.includes(buildCode(r)))
            }
        }
        return rows
    }

    const setSelection = (selection: string[]) => {
        const selectedCategories = selection.filter(isCategory)
        debugger;
        if (selectedCategories.length === 1) {
            setFilter({key: FilterCategories.DEPARTAMENTO, value: selectedCategories[0]})
        } else if (selection.length === 1) {
            setFilter({key: FilterCategories.PRODUCTO, value: selection})
        } else if (selection.length === 0) {
            setFilter(undefined)
        } else {
            setFilter({value: selection})
        }
        setSelectedFilters(selection)
        setShowFilters(false)
    }

    const handleShowFilterChange = () => {
        setShowFilters(!showFilters)
    };
    return (
        <Container disableGutters>
            <Grid container spacing={2} my={5}>
                <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                    {showFilters &&
                        <FilterSelector setSelection={setSelection} selectedFilters={selectedFilters}/>
                    }
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                        <Button variant='contained' color={"secondary"} sx={{maxWidth: '150px'}}
                                onClick={handleShowFilterChange}>Mostrar
                            Filtros</Button>
                        <GeneralReportByProduct filter={filter} rows={filterRows()}/>
                    </div>
                </div>
            </Grid>
        </Container>
    );
};

export default GeneralReportView;
