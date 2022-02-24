import React, {FC} from "react";
import {ExtraLiveInformation} from "../../types/system";
import {Line} from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Tooltip,
);

const LiveCardChartJS: FC<Props> = ({extraInformation}) => {
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
        animations: {
            y: {
                duration: 0,
            },
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
                tension: 0.1,
                pointRadius: 1
            },
        ],
    };

    return (
        <div className={"p-3"}>
            <Line options={options} data={data}/>
        </div>
    );
}

interface Props {
    extraInformation: ExtraLiveInformation;
}

export default LiveCardChartJS;
