import {useState} from "react";
import {Button, Container, Grid} from "@mui/material";
import {
    FilterCategories,
    GeneralReportByProduct,
    IFilter,
} from "../components/graphs/GeneralReportByProduct";
import {FilterSelector} from "./FilterSelector";
import {isCategory} from "../components/ControlledSelection";
import {rows} from "../components/data";

const buildCode = ({departamento, producto}: { departamento: string, producto: string }) => {
    return `${departamento}-${producto}`
}

const GeneralReportView = () => {
    const [filter, setFilter] = useState<IFilter | undefined>()
    const [showFilters, setShowFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const filterRows = () => {
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
