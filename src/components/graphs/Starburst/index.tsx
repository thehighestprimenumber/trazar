import {groupBy} from "lodash";
import sumBy from "lodash/sumBy";
import {rows} from "../../data";
import {Row} from "../GeneralReportByProduct";
import {FC, useState} from "react";
import {ResponsiveSunburst} from '@nivo/sunburst'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Button} from "@mui/material";
import FieldValueSwitch from "../../FieldValueSwitch";
import {GraphValue} from "../GroupedChart";

interface SunburstDataItem {
    name: string;
    children?: SunburstDataItem[];
    value?: number;
}

function transformDataForSunburst(data: Row[], graphValue: GraphValue): SunburstDataItem {
    // Group data by department
    // Group data by department
    const byDepartment = groupBy(data, 'departamento');

    // Create the root of the Sunburst data structure
    const sunburstData: SunburstDataItem = {
        name: "departamentos",
        children: []
    };

    // Populate the children for each department
    Object.entries(byDepartment).forEach(([department, items]) => {
        const byProduct = groupBy(items, 'producto');

        const departmentNode: SunburstDataItem = {
            name: department,
            children: []
        };

        Object.entries(byProduct).forEach(([product, productItems]) => {
            const productNode: SunburstDataItem = {
                name: product,
                value: sumBy(productItems, graphValue === GraphValue.UNIT ? 'vendidoCant' : e => e.vendidoCant * e.precio)
            };

            departmentNode.children!.push(productNode);
        });

        sunburstData.children!.push(departmentNode);
    });

    return sunburstData;
}

// Example transformed data structure:
// {
//   "name": "departamentos",
//   "children": [
//     {
//       "name": "carne",
//       "children": [
//         {
//           "name": "lomo",
//           "value": 952
//         }
//       ]
//     },
//     {
//       "name": "cerdo",
//       "children": [
//         {
//           "name": "solomillo",
//           "value": 91
//         }
//       ]
//     }
//   ]
// }


interface MySunburstChartProps {
    // data: SunburstDataItem;
}

const MySunburstChart: FC<MySunburstChartProps> = () => {
    const [history, setHistory] = useState<SunburstDataItem[]>([]);
    const [graphValue, setGraphValue] = useState(GraphValue.UNIT)
    const [currentData, setCurrentData] = useState<SunburstDataItem>(transformDataForSunburst(rows, graphValue));

    const handleFieldValueChange = () => {
        setGraphValue(oldState => {
            if (oldState === GraphValue.UNIT) {
                return GraphValue.PRICE
            } else return GraphValue.UNIT
        })
        setCurrentData(transformDataForSunburst(rows, graphValue))
    }

    const handleClick = (node: any) => {
        if (node.data.children) {
            setHistory([...history, currentData]);
            setCurrentData(node.data);
        }
    };

    const handleBack = () => {
        const newHistory = [...history];
        const lastData = newHistory.pop();
        if (lastData) {
            setCurrentData(lastData);
            setHistory(newHistory);
        }
    };
//
    return (
        <>
            <>

                {history.length > 0
                    ? <Button onClick={handleBack}><ArrowBackIcon/></Button>
                    : <FieldValueSwitch handleFieldValueChange={handleFieldValueChange}/>}
            </>
            <ResponsiveSunburst
                data={currentData}
                margin={{top: 20, right: 100, bottom: 80, left: 60}}
                id="name"
                value="value"
                cornerRadius={2}
                borderColor={{theme: 'background'}}
                colors={{scheme: 'nivo'}}
                childColor={{from: 'color', modifiers: [['brighter', 0.4]]}}
                animate={true}
                motionConfig="gentle"
                isInteractive={true}
                onClick={handleClick}
                enableArcLabels={true}
                arcLabel={"id"}
                transitionMode={"centerRadius"}
            />
        </>
    )


};
export default MySunburstChart;
