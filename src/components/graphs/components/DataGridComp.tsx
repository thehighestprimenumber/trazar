//MRT Imports
import {
    MaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    useMaterialReactTable,
} from 'material-react-table';

//Material UI Imports
import {Box, lighten,} from '@mui/material';

function DataGridComp(props: { columns: any; data: any; }) {
    const {columns, data} = props;

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        // enableColumnFilterModes: true,
        enableColumnResizing: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        columnResizeMode: "onChange",
        // enableFacetedValues: true,
        // enableRowActions: false,
        // enableRowSelection: true,
        initialState: {
            // showColumnFilters: true,
            showGlobalFilter: true,
            columnPinning: {
                // left: ['mrt-row-expand', 'mrt-row-select'],
                // right: ['mrt-row-actions'],
            },
        },
        paginationDisplayMode: 'default',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 50, 100, 200],
            shape: 'rounded',
            variant: 'outlined',
        },

        renderTopToolbar: ({table}) => {
            return (
                <Box
                    sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: 'flex',
                        gap: '0.5rem',
                        p: '7px',
                        justifyContent: 'space-between',
                    })}
                >
                    <Box sx={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                        <MRT_GlobalFilterTextField table={table}/>
                        <MRT_ToggleFiltersButton table={table}/>
                    </Box>

                </Box>
            );
        },
    });

    return <MaterialReactTable table={table}/>;
}


export default DataGridComp;
