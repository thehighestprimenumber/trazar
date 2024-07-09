import {argentinaShortDateFormatter} from "../../../helpers/formatting";
import {rows} from "../../data";
import {Dictionary, groupBy} from "lodash";
import {Row} from "../GeneralReportByProduct";
import sumBy from "lodash/sumBy";
import LineChart from "./index";
import {ILineChart} from "./types";
import {useState} from "react";
import {Datum} from "@nivo/line";
import FieldValueSwitch from "../../FieldValueSwitch";

enum GraphValue {
    UNIT = 'unit',
    PRICE = 'price'
}

function transformData({departamento, graphValue}: {
    departamento?: string,
    // producto?: string,
    graphValue: GraphValue
}): ILineChart[] {
    const byDept = groupBy(rows, 'departamento');
    let outputData;
    if (!departamento) {
        outputData = Object.entries(byDept).map(([department, productsInDepartment]) => {
                const byDate: Dictionary<Row[]> = groupBy(productsInDepartment, row => argentinaShortDateFormatter.format(row.fecha))
                return {
                    id: department,
                    data: Object.values(byDate).map(e => ({
                        x: argentinaShortDateFormatter.format(e[0].fecha),
                        y: graphValue === GraphValue.UNIT
                            ? sumBy(e, 'vendidoCant')
                            : (sumBy(e, (entry) => entry.vendidoCant * entry.precio))

                    }))
                }
            }
        )

    } else {
        const products = byDept[departamento];
        const byProduct: Dictionary<Row[]> = groupBy(products, 'producto')
        outputData = Object.entries(byProduct).map(([productName, sales]) => {
            return ({
                id: productName,
                data: sales.map(s => {
                    return ({
                        x: argentinaShortDateFormatter.format(s.fecha),
                        y: graphValue === GraphValue.UNIT ? s.vendidoCant : s.precio * s.vendidoCant,
                    });
                })
            });
        })
            .concat({id: 'Todos', data: []});
    }

    return outputData
}

export default function LineaPorFecha() {
    const [graphValue, setGraphValue] = useState(GraphValue.UNIT)
    const [filter, setFilter] = useState<string | undefined>()

    function handleFilterChange(datum: Datum) {
        if (datum.id === 'Todos') {
            setFilter(undefined)
        } else {
            if (!filter) {
                setFilter(datum.id)
            }
        }
    }

    const handleFieldValueChange = () => {
        setGraphValue(oldState => {
          if (oldState === GraphValue.UNIT) {
              return GraphValue.PRICE
          }  else return GraphValue.UNIT
        })
    }

    return <>
        <FieldValueSwitch handleFieldValueChange={handleFieldValueChange}/>
        <LineChart handleFilterChange={handleFilterChange} currency={graphValue == GraphValue.PRICE}
                   data={transformData({departamento: filter, graphValue})}/>
    </>
}