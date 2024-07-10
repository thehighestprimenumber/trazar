import {Datum, ResponsiveLine} from '@nivo/line'
import {ILineChart} from "./types";

const LineChart = ({data, currency, handleFilterChange}: {
    data: ILineChart[],
    currency?: boolean,
    handleFilterChange: (point: Datum) => void
}) => {
    // @ts-ignore
    return <ResponsiveLine
        data={data}
        margin={{top: 5, right: 50, bottom: 110, left: 60}}
        xScale={{type: 'point'}}
        yFormat={currency ? " ^-$0,.0~d" : ' >-0,.0~f'}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        // yFormat=" >-.2f"
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
        // @ts-ignore
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
                // onClick: data => handleFilterChange(data),
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
export default LineChart

