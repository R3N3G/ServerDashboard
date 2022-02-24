import React, {FC, useRef} from "react";
import {ExtraLiveInformation} from "../../types/system";
import {Line} from 'react-chartjs-2';
import {
    ArcElement,
    BarController,
    BarElement,
    BubbleController,
    CategoryScale,
    Chart as ChartJS,
    Decimation,
    DoughnutController,
    Filler,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    LogarithmicScale,
    PieController,
    PointElement,
    PolarAreaController,
    RadarController,
    RadialLinearScale,
    ScatterController,
    SubTitle,
    TimeScale,
    TimeSeriesScale,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

const SystemMiddle: FC<Props> = ({extraInformation}) => {
    const chartRef: any = useRef();

    const previousY = (ctx: any) => {
        if (ctx.index === 0) {
            return ctx.chart.scales.y.getPixelForValue(0);
        } else {
            return ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        }
    }

    const style = getComputedStyle(document.body);
    const color = 'rgba(' + style.getPropertyValue('--bs-' + extraInformation.color + '-rgb') + ')';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            y: {
                display: false,
                min: 0,
                max: 100,
            },
            x: {
                display: false,
            }
        },
        animation: {
            y: {duration: 500, from: previousY},
            duration: 0.5,
        },
    };

    const labels = extraInformation.chartLabelX;

    const data = {
        labels,
        datasets: [
            {
                data: extraInformation.chartData,
                borderColor: color,
                backgroundColor: color,
                fill: false,
                tension: 0.4,
                pointRadius: 1
            },
        ],
    };

    return (
        <div className={"px-3 rounded-bottom"}>
            <Line ref={chartRef} options={options} data={data}/>
        </div>
    );
}

interface Props {
    extraInformation: ExtraLiveInformation;
}

export default SystemMiddle;
