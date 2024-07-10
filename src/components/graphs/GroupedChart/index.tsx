import {rows} from "../../data";
import {Row} from "../GeneralReportByProduct";
import {useState} from "react";
import FieldValueSwitch from "../../FieldValueSwitch";
import {ResponsiveBar} from "@nivo/bar";
import {groupBy} from "lodash";
import sumBy from "lodash/sumBy";
import {argentinaShortDateFormatter} from "../../../helpers/formatting";

enum GraphValue {
    UNIT = 'unit',
    PRICE = 'price'
}

function getByDept(dept: string, sales: Row[]) {

    return //values.filter(e => e.departmento === 'carne').map(([dept, sales]) => ({dept: sumBy(sales, 'vendidoCant')}));
}

// interface ByDate {
//     fecha: string;
//     salesOnDate: Row[];
// }

/*function transformData(): IGroupedBar[] {

    const byDate: ByDate = (groupBy(rows, row => argentinaShortDateFormatter.format(row.fecha)) as unknown as ByDate);
    const finalOutput = {}
    let outputData: IGroupedBar[] = Object.entries(byDate).map(
        ([fecha, salesOnDate]) => {
            console.log('salesOnDate', JSON.stringify(salesOnDate[0])) // TODO
            const byStore: Dictionary<Row[]> = groupBy(Object.values(salesOnDate), 'sucursal')
            console.log('byStore', JSON.stringify(byStore)) // TODO
            let output: any = {}
            const test = groupBy(salesOnDate, 'department')
            console.log('test', JSON.stringify(test)) // TODO
            Object.entries(test).forEach(([k, v]) => {
                    console.log('k', JSON.stringify(k)) // TODO

                    return output[k] = sumBy(v, 'vendidoCant');
                }
            )

            // const test = deptarments.map(d => getByDept(byStore, salesOnDate))

            console.log('output', JSON.stringify(output)) // TODO
            return {
                fecha: fecha,
                carne: 100,
                cerdo: 100,
                pollo: 110,
                ...output

            }
        }
    )

    // } else {
    //     const products = byDate[sucursal];
    //     const byProduct: Dictionary<Row[]> = groupBy(products, 'producto')
    //     outputData = Object.entries(byProduct).map(([productName, sales]) => {
    //         return ({
    //             id: productName,
    //             data: sales.map(s => {
    //                 return ({
    //                     x: argentinaShortDateFormatter.format(s.fecha),
    //                     y: graphValue === GraphValue.UNIT ? s.vendidoCant : s.precio * s.vendidoCant,
    //                 });
    //             })
    //         });
    //     })
    //         .concat({id: 'Todos', data: []});
    // }

    return outputData
}*/

interface DataItem {
    id: string;
    producto: string;
    departamento: string;
    ticketCantidad: number;
    vendidoCant: number;
    precio: number;
    sucursal: number;
    fecha: Date;
}

interface TransformedDataItem {
    date: string;
    [key: string]: number | string;
}

interface ByDate {
    [fecha: string]: DataItem[];
}

interface Dictionary<T> {
    [key: string]: T;
}

function transformData(data: Row[], graphValue: GraphValue): TransformedDataItem[] {
    // Group data by date
    // @ts-ignore
    const byDate: ByDate = groupBy(data, item => argentinaShortDateFormatter.format(item.fecha))
    // Transform grouped data into the desired format
    return Object.entries(byDate).map(([date, salesOnDate]) => {
        // Group sales on the date by sucursal
        const byStore: Dictionary<DataItem[]> = groupBy(salesOnDate, 'sucursal');

        // Prepare the output object for this date
        const output: { [key: string]: number | string } = {fecha: date};

        // Sum vendidoCant by department within each store
        Object.entries(byStore).forEach(([sucursal, sales]) => {
                output[`suc_${sucursal}`] = sumBy(sales, graphValue === GraphValue.UNIT ? 'vendidoCant' : e => e.vendidoCant * e.precio);
        });

        return output as TransformedDataItem;
    });
}


export default function GroupedChartByStore() {
    const [graphValue, setGraphValue] = useState(GraphValue.UNIT)
    const [filter, setFilter] = useState<string | undefined>()

    // function handleFilterChange(datum: Datum) {
    //     if (datum.id === 'Todos') {
    //         setFilter(undefined)
    //     } else {
    //         if (!filter) {
    //             setFilter(datum.id)
    //         }
    //     }
    // }

    const handleFieldValueChange = () => {
        setGraphValue(oldState => {
            if (oldState === GraphValue.UNIT) {
                return GraphValue.PRICE
            } else return GraphValue.UNIT
        })
    }
    const data = transformData(rows, graphValue)
    return <>
        <FieldValueSwitch handleFieldValueChange={handleFieldValueChange}/>

        <ResponsiveBar
            // @ts-ignore
            data={data}
            keys={[
               'suc_1', 'suc_2', 'suc_3'
            ]}
            valueFormat={graphValue === GraphValue.PRICE ? " ^-$0,.0~d" : ' >-0,.0~f'}
            indexBy="fecha"
            margin={{top: 20, right: 100, bottom: 80, left: 60}}
            padding={0.4}
            groupMode="grouped"
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            colors={{scheme: 'nivo'}}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'fecha',
                legendPosition: 'middle',
                legendOffset: -32,
                truncateTickAt: 0
            }}
            // axisLeft={{
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     legend: 'ventas',
            //     legendPosition: 'middle',
            //     legendOffset: -40,
            //     truncateTickAt: 0
            // }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            // ariaLabel="Nivo bar chart demo"
            // barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
        {/*<LineChart handleFilterChange={handleFilterChange} currency={graphValue == GraphValue.PRICE}*/}
        {/*           data={transformData({sucursal: filter, graphValue})}/>*/}
    </>
}