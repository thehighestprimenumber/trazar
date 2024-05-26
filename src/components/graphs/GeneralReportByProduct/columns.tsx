import type {MRT_ColumnDef} from "material-react-table";
import {argentinaDateFormatter} from "../../../helpers/formatting";
import {Row, RowCalculated} from "./index";
import {asCurrency, calculateMontoPercentage, calculatePercentage, getMonto} from "./helpers";

const width = 150;

export const departamentoColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    accessorKey: 'departamento',
    header: 'Departamento',
    filterVariant: 'autocomplete',
    size: width
});
export const productoColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    accessorKey: 'producto',
    header: 'Producto',
    size: width,
    filterVariant: 'autocomplete'
});
export const ticketCantidadColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    accessorKey: 'ticketCantidad',
    header: 'Cant. de Tickets',
    filterVariant: 'range',
    size: width
});
export const ticketCantidadPrcColumn: (rows: Row[]) => MRT_ColumnDef<RowCalculated> = (rows) => ({
    id: 'ticketCantidadPrc',
    header: 'Cant. de Tickets %',
    size: width,
    filterVariant: 'range',
    accessorFn: calculatePercentage(rows)('ticketCantidad')
});
export const vendidoCantColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    accessorKey: 'vendidoCant',
    header: 'Cant. Vendida',
    filterVariant: 'range',
    size: width
});
export const vendidoCantPrcColumn: (rows: Row[]) => MRT_ColumnDef<RowCalculated> = (rows => ({
    id: 'vendidoCantPrc',
    header: 'Cant. Vendida %',
    size: width,
    filterVariant: 'range',
    accessorFn: calculatePercentage(rows)("vendidoCant")
}));
export const precioColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    id: 'precio',
    header: 'Precio',
    filterVariant: 'range',
    size: width,
    accessorFn: (row) => asCurrency(row.precio)
})
export const montoColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    id: 'monto',
    header: 'Monto',
    filterVariant: 'range',
    size: width,
    accessorFn: getMonto
});
export const montoPrcColumn: (rows: Row[]) => MRT_ColumnDef<RowCalculated> = (rows => ({
    id: 'montoPrc',
    header: 'Monto %',
    filterVariant: 'range',
    size: width,
    accessorFn: calculateMontoPercentage(rows)
}));
export const fechaColumn: () => MRT_ColumnDef<RowCalculated> = () => ({
    id: 'fecha',
    header: 'Fecha',
    size: width,
    accessorFn: (row: Row) => argentinaDateFormatter.format(row.fecha)
});