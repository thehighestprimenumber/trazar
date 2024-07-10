import {useState} from "react";
import {Button, Container, Grid} from "@mui/material";
import {
    FilterCategories,
    GeneralReportByProduct,
    IFilter,
    Row,
    RowCalculated,
} from "../components/graphs/GeneralReportByProduct";
import {FilterSelector} from "./FilterSelector";
import {isCategory} from "../components/ControlledSelection";
import {rows} from "../components/data";
import {
    asCurrency,
    calculateMontoPercentage,
    calculatePercentage,
    getMonto
} from "../components/graphs/GeneralReportByProduct/helpers";

const buildCode = ({departamento, producto}: { departamento: string, producto: string }) => {
    return `${departamento}-${producto}`
}

const GeneralReportView = () => {
    const [filter, setFilter] = useState<IFilter | undefined>()
    const [showFilters, setShowFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const transformedRows: RowCalculated[] = rows.map((row: Row) => {
        const {vendidoCant, ticketCantidad, precio, ...rest} = row

        return ({
            ...rest,
            precio,
            monto: `${getMonto({
                vendidoCant,
                precio
            })} (${calculateMontoPercentage(rows, row)})`,
            vendidoCant: `${(vendidoCant)} (${calculatePercentage(rows,"vendidoCant")(row)})`,
            ticketCantidad: `${(ticketCantidad)} (${calculatePercentage(rows,"ticketCantidad")(row)})`
        });
    })

    const filterRows = () => {
        if (filter?.key === FilterCategories.DEPARTAMENTO && !!filter.value) {
            return transformedRows.filter(row => row.departamento === filter.value)
        } else {
            if (!!filter?.value.length) {
                return transformedRows.filter(r => filter.value.includes(buildCode(r)))
            }
        }
        return transformedRows
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
