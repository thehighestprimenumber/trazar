import DataGridComp from "../components/DataGridComp";
import React, {useMemo} from "react";
import {type MRT_ColumnDef,} from 'material-react-table';
import {
    departamentoColumn,
    montoColumn,
    montoPrcColumn,
    precioColumn,
    productoColumn,
    ticketCantidadColumn,
    ticketCantidadPrcColumn,
    vendidoCantColumn,
    vendidoCantPrcColumn
} from "./columns";
import {indexOf, pullAt, uniqBy} from "lodash";

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


export interface IFilter {
    key?: FilterCategories;
    value: string[] | string;
}

export enum FilterCategories {
    DEPARTAMENTO = 'departamento',
    PRODUCTO = 'producto',
}

export enum Granularities {
    GENERAL = 'general',
    SINGLE = 'single',
}

interface Props {
    rows: Row[],
    // granularity: Granularities,
    filter?: IFilter | undefined,
}


type ColumnFn = (() => MRT_ColumnDef<RowCalculated>) | ((rows: Row[]) => MRT_ColumnDef<RowCalculated>);

export function GeneralReportByProduct({filter, rows}: Props) {
    let columnNames: ColumnFn[] = [
        // {accessorKey: 'id', header: 'ID', size: 90, enableHiding: true},
        departamentoColumn,
        productoColumn,
        ticketCantidadColumn,
        ticketCantidadPrcColumn,
        vendidoCantColumn,
        vendidoCantPrcColumn,
        precioColumn,
        montoColumn,
        montoPrcColumn,
    ];

    const removeFromColumns = (column: ColumnFn) => {
        return pullAt(columnNames, indexOf(columnNames, column));
    }

    function hasOnlyOne(field: 'departamento' | 'producto') {
        return uniqBy(rows, field).length === 1;
    }

    if (hasOnlyOne('departamento')) {
        removeFromColumns(departamentoColumn);
    } else if (hasOnlyOne('producto')) {
        debugger
        removeFromColumns(productoColumn);
    }

    const columns = useMemo<MRT_ColumnDef<RowCalculated>[]>(
        () => {
            return [{id: 'ventas', header: 'Ventas', columns: columnNames.map(c => c(rows))}];
        }, [filter, rows])


    return <DataGridComp
        columns={columns}
        data={rows}/>
}
