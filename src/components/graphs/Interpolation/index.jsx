import {ResponsiveLine} from '@nivo/line'
import {data as rawData} from "../../data";
import {argentinaDateFormatter} from "../../../helpers/formatting";

function transformData(inputData) {
    const categories = ["carne", "pollo", "cerdo"];

    const outputData = categories.map(category => {
        return {
            id: category,
            data: inputData.slice(-5).map(entry => ({
                x: argentinaDateFormatter.format(entry.date),
                y: entry[category]
            }))
        };
    });

    return outputData;
}

const Interpolation = () => {

    const data =  transformData(rawData);

    return <ResponsiveLine
        data={data}
        margin={{top: 20, right: 50, bottom: 50, left: 60}}
        xScale={{type: 'point'}}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'transportation',
        //     legendOffset: 36,
        //     legendPosition: 'middle',
        //     truncateTickAt: 0
        // }}
        // axisLeft={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'count',
        //     legendOffset: -40,
        //     legendPosition: 'middle',
        //     truncateTickAt: 0
        // }}
        colors={{scheme: 'nivo'}}
        pointSize={10}
        pointColor={{theme: 'background'}}
        pointBorderWidth={2}
        pointBorderColor={{from: 'serieColor'}}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 50,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}
export default Interpolation