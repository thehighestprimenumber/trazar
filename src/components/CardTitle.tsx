import {Typography} from "@mui/material";

export enum GraphValue {
    UNIT = 'unit',
    PRICE = 'price'
}

export function CardTitle(props: { graphValue: GraphValue }) {
    return <Typography p={2}>Ventas en {props.graphValue == GraphValue.PRICE ? "Pesos" : "Unidades"}</Typography>;
}