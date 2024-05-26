//MRT Imports
import {
    MaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    useMaterialReactTable,
} from 'material-react-table';

//Material UI Imports
import {Box, lighten,} from '@mui/material';

//Icons Imports
//Date Picker Imports - these should just be in your Context Provider

// const columns = useMemo<MRT_ColumnDef<Row>[]>(
//     () => [
//         {
//             id: 'producto', //id used to define `group` column
//             header: 'Producto',
//             columns: [
//                 {
//                     accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
//                     id: 'name', //id is still required when using accessorFn instead of accessorKey
//                     header: 'Name',
//                     size: 250,
//                     Cell: ({renderedCellValue, row}) => (
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '1rem',
//                             }}
//                         >
//                             <img
//                                 alt="avatar"
//                                 height={30}
//                                 src={row.original.avatar}
//                                 loading="lazy"
//                                 style={{borderRadius: '50%'}}
//                             />
//                             {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
//                             <span>{renderedCellValue}</span>
//                         </Box>
//                     ),
//                 },
//                 {
//                     accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
//                     enableClickToCopy: true,
//                     filterVariant: 'autocomplete',
//                     header: 'Email',
//                     size: 300,
//                 },
//             ],
//         },
//         {
//             id: 'id',
//             header: 'Job Info',
//             columns: [
//                 {
//                     accessorKey: 'salary',
//                     // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
//                     filterFn: 'between',
//                     header: 'Salary',
//                     size: 200,
//                     //custom conditional format and styling
//                     Cell: ({cell}) => (
//                         <Box
//                             component="span"
//                             sx={(theme) => ({
//                                 backgroundColor:
//                                     cell.getValue<number>() < 50_000
//                                         ? theme.palette.error.dark
//                                         : cell.getValue<number>() >= 50_000 &&
//                                         cell.getValue<number>() < 75_000
//                                             ? theme.palette.warning.dark
//                                             : theme.palette.success.dark,
//                                 borderRadius: '0.25rem',
//                                 color: '#fff',
//                                 maxWidth: '9ch',
//                                 p: '0.25rem',
//                             })}
//                         >
//                             {cell.getValue<number>()?.toLocaleString?.('en-US', {
//                                 style: 'currency',
//                                 currency: 'USD',
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 0,
//                             })}
//                         </Box>
//                     ),
//                 },
//                 {
//                     accessorKey: 'jobTitle', //hey a simple column for once
//                     header: 'Job Title',
//                     size: 350,
//                 },
//                 {
//                     accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
//                     id: 'startDate',
//                     header: 'Start Date',
//                     filterVariant: 'date',
//                     filterFn: 'lessThan',
//                     sortingFn: 'datetime',
//                     Cell: ({cell}) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
//                     Header: ({column}) => <em>{column.columnDef.header}</em>, //custom header markup
//                     muiFilterTextFieldProps: {
//                         sx: {
//                             minWidth: '250px',
//                         },
//                     },
//                 },
//             ],
//         },
//     ],
//     [],
// );

function DataGridComp(props: { columns: any; data: any; }) {
    const {columns, data} = props;

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        // enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        // enableFacetedValues: true,
        // enableRowActions: false,
        // enableRowSelection: true,
        initialState: {
            // showColumnFilters: true,
            showGlobalFilter: true,
            columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
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
        // renderDetailPanel: ({row}) => (
        //     <Box
        //         sx={{
        //             alignItems: 'center',
        //             display: 'flex',
        //             justifyContent: 'space-around',
        //             left: '30px',
        //             maxWidth: '1000px',
        //             position: 'sticky',
        //             width: '100%',
        //         }}
        //     >
        //         <img
        //             alt="avatar"
        //             height={200}
        //             src={row.original.avatar}
        //             loading="lazy"
        //             style={{borderRadius: '50%'}}
        //         />
        //         <Box sx={{textAlign: 'center'}}>
        //             <Typography variant="h4">Signature Catch Phrase:</Typography>
        //             <Typography variant="h1">
        //                 &quot;{row.original.signatureCatchPhrase}&quot;
        //             </Typography>
        //         </Box>
        //     </Box>
        // ),
        // renderRowActionMenuItems: ({closeMenu}) => [
        //     <MenuItem
        //         key={0}
        //         onClick={() => {
        //             // View profile logic...
        //             closeMenu();
        //         }}
        //         sx={{m: 0}}
        //     >
        //         <ListItemIcon>
        //             <AccountCircle/>
        //         </ListItemIcon>
        //         View Profile
        //     </MenuItem>,
        //     <MenuItem
        //         key={1}
        //         onClick={() => {
        //             // Send email logic...
        //             closeMenu();
        //         }}
        //         sx={{m: 0}}
        //     >
        //         <ListItemIcon>
        //             <Send/>
        //         </ListItemIcon>
        //         Send Email
        //     </MenuItem>,
        // ],
        renderTopToolbar: ({table}) => {
            return (
                <Box
                    sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: 'flex',
                        gap: '0.5rem',
                        p: '8px',
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
