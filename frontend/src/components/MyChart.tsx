import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import {FC} from "react";
import {ExtraLiveInformation} from "../../types/system";

const MyChart: FC<Props> = ({extraInformation}) => {
    const style = getComputedStyle(document.body);
    const color = 'rgba(' + style.getPropertyValue('--bs-' + extraInformation.color + '-rgb') + ')';

    const data = {
        datasets: [
            {
                data: extraInformation.chartData,
                borderColor: color,
                backgroundColor: color,
                fill: false,
                tension: 0.5,
                pointRadius: 1
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Usage'
            },
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
                labels: extraInformation.chartLabelX,
            }
        },
        animation: {
            duration: 0
        },
    };

    return (
        <Chart id="myChart" type='line' options={options} data={data}/>
    );
}

interface Props {
    extraInformation: ExtraLiveInformation;
}

export default MyChart;
