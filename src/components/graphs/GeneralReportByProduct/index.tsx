import DataGridComp from "../components/DataGridComp";
import React, {useMemo} from "react";

import {argentinaDateFormatter} from "../../../helpers/formatting";
import {type MRT_ColumnDef,} from 'material-react-table';

const sumBy = require("lodash/sumBy");
const sum = require("lodash/sum");

export interface Row {
    id: string;
    producto: string;
    departamento: string;
    ticketCantidad: number;
    vendidoCant: number;
    precio: number;
    fecha: Date;
}

export interface RowCalculated extends Row {
    ticketCantidadPrc: number;
    vendidoCantPrc: number;
    montoPrc: number;
    monto: number;
}

const width = 150;
const rows: Row[] = [{
    id: '1',
    producto: 'lomo',
    departamento: 'carne',
    ticketCantidad: 10,
    vendidoCant: 50,
    precio: 8000,
    fecha: new Date('2024-01-01')
},
    {
        id: '2',
        producto: 'asado',
        departamento: 'carne',
        ticketCantidad: 8,
        vendidoCant: 60,
        precio: 6000,
        fecha: new Date('2024-01-01')
    },
    {
        id: '3',
        producto: 'pechuga',
        departamento: 'pollo',
        ticketCantidad: 14,
        vendidoCant: 20,
        precio: 3000,
        fecha: new Date('2024-01-01')
    }]

const asPercentage = (n: number) => (n * 100).toFixed(2) + '%'
const calculatePercentage = (value: keyof Row) => (row: Row) => asPercentage((row[value] as number / sumBy(rows, value)))

const calculateMonto = (row: Row) => (row.precio * row.vendidoCant) as number
const asCurrency = (n: number) => n.toLocaleString?.('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
})
const calculateMontoPercentage = (row: Row) => asPercentage(calculateMonto(row) / sum(rows.map(calculateMonto)))

const getMonto = (r: Row) => asCurrency(calculateMonto(r));

export const GeneralReportByProduct: React.FC = () => {
    const columns = useMemo<MRT_ColumnDef<RowCalculated>[]>(
        () => [
            {
                id: 'ventas', header: 'Ventas', columns: [
                    // {accessorKey: 'id', header: 'ID', size: 90, enableHiding: true},
                    {accessorKey: 'departamento', header: 'Departamento', filterVariant: 'autocomplete', size: width},
                    {accessorKey: 'producto', header: 'Producto', size: width, filterVariant: 'autocomplete'},
                    {accessorKey: 'ticketCantidad', header: 'Cant. de Tickets', filterVariant: 'range', size: width},
                    {
                        id: 'ticketCantidadPrc',
                        header: 'Cant. de Tickets %',
                        size: width,
                        filterVariant: 'range',
                        accessorFn: calculatePercentage('ticketCantidad')
                    },
                    {accessorKey: 'vendidoCant', header: 'Cant. Vendida', filterVariant: 'range', size: width},
                    {
                        id: 'vendidoCantPrc',
                        header: 'Cant. Vendida %',
                        size: width,
                        filterVariant: 'range',
                        accessorFn: calculatePercentage("vendidoCant")
                    },
                    {
                        id: 'precio',
                        header: 'Precio',
                        filterVariant: 'range',
                        size: width,
                        accessorFn: (row) => asCurrency(row.precio)
                    },
                    {
                        id: 'monto',
                        header: 'Monto',
                        filterVariant: 'range',
                        size: width,
                        accessorFn: getMonto
                    },
                    {
                        id: 'montoPrc',
                        header: 'Monto %',
                        filterVariant: 'range',
                        size: width,
                        accessorFn: calculateMontoPercentage
                    },
                    {
                        id: 'fecha',
                        header: 'Fecha',
                        size: width,
                        accessorFn: (row: Row) => argentinaDateFormatter.format(row.fecha)
                    }
                ]
            }
        ], [])

    return <DataGridComp
        columns={columns}
        data={rows}/>
}
