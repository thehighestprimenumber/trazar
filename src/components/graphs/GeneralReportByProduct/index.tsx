import DataGridComp from "../components/DataGridComp";
import React, {useMemo} from "react";
import {type MRT_ColumnDef,} from 'material-react-table';
import {
    departamentoColumn,
    fechaColumn,
    montoColumn,
    montoPrcColumn,
    precioColumn,
    productoColumn,
    ticketCantidadColumn,
    ticketCantidadPrcColumn,
    vendidoCantColumn,
    vendidoCantPrcColumn
} from "./columns";
import {indexOf, pullAt} from "lodash";

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
    key: FilterCategories;
    value: string;
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
    granularity: Granularities,
    filter?: IFilter | undefined,
}


type ColumnFn = (() => MRT_ColumnDef<RowCalculated>) | ((rows: Row[]) => MRT_ColumnDef<RowCalculated>);

export function GeneralReportByProduct({granularity, filter, rows}: Props) {
    console.log('filter', JSON.stringify(filter))
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
        fechaColumn
    ];

    const removeFromColumns = (column: ColumnFn) => pullAt(columnNames, indexOf(columnNames, column))

    switch (filter?.key) {
        case FilterCategories.PRODUCTO:
            removeFromColumns(productoColumn);
            break;
        case FilterCategories.DEPARTAMENTO:
            removeFromColumns(departamentoColumn);
            removeFromColumns(productoColumn)
            break;
    }


    const columns = useMemo<MRT_ColumnDef<RowCalculated>[]>(
        () => {
            return [{id: 'ventas', header: 'Ventas', columns: columnNames.map(c => c(rows))}];
        }, [filter])


    return <DataGridComp
        columns={columns}
        data={rows}/>
}
