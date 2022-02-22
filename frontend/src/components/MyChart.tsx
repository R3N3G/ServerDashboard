import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import {FC} from "react";
import {BasicSystemInformation, ExtraInformation} from "../../types/system";


const MyChart: FC<Props> = ({extraInformation, basicInformation}) => {
    const style = getComputedStyle(document.body);
    const color = 'rgba(' + style.getPropertyValue('--bs-' + extraInformation.color + '-rgb') + ')';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        scales: {
            y: {
                display: false,
                min: 0,
                max: 100,
            },
            x: {
                labels: extraInformation.chartData,
                display: false
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            labels: {
                display: false,
            },
        },
    };

    return (
        <div>
            <Chart id="myChart" type='line'
                   options={options}
                   data={{
                       datasets: [
                           {
                               data: extraInformation.chartData,
                               backgroundColor: color,
                               fill: false,
                               tension: 0.2,
                               pointRadius: 1.5
                           },
                       ],
                   }}/>
        </div>
    );
}

interface Props {
    extraInformation: ExtraInformation;
    basicInformation: BasicSystemInformation;
}

export default MyChart;
