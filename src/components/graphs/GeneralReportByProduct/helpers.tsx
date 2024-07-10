import sumBy from "lodash/sumBy";
import sum from "lodash/sum";
import {Row} from "./index";

export const asPercentage = (n: number) => (n * 100).toFixed(2) + '%'
export const calculatePercentage = (rows: Row[], value: keyof Row) => (row: Row) => asPercentage((row[value] as number / sumBy(rows, value)))
export const calculateMonto = (row: Row | {precio: number, vendidoCant: number}) => (row.precio * row.vendidoCant) as number
export const asCurrency = (n: number) => n.toLocaleString?.('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
})
export const calculateMontoPercentage = (rows: Row[], row: Row) => asPercentage(calculateMonto(row) / sum(rows.map(calculateMonto)))
export const getMonto = (r: Row | {precio: number, vendidoCant: number}) => asCurrency(calculateMonto(r));