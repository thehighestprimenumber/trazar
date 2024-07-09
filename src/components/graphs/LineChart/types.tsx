export interface ILineChart {
    "id": string, /* el departamento, la línea */
    "data": {
        "x": string; /* la fecha */
        "y": number | string; /* el total */
    }[]
}