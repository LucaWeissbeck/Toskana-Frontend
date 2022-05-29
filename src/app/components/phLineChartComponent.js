import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";


const options = {
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                max: 14,
                stepsize: 1,
                fontSize: 25,
                fontColor: "white"
            },
            gridLines: {
                color: "rgba(204, 204, 204,0.5)"
            }
        }],
        xAxes: [{
            ticks: {
                fontColor: "white"
            },
            gridLines: {
                color: "rgba(204, 204, 204,0.1)"
            }
        }]
    },
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 4,
            backgroundColor: "rgba(204, 204, 204,0.5)"
        }
    }
}

export const PhLineChartComponent = (props) => {
    const [rawWeekData, setRawWeekData] = useState([]);
    const [graphData, setGraphData] = useState(null);


    useEffect(() => {
        setRawWeekData(props.phWeekData);
        let tempData = [];
        let tempLabels = [];
        if (rawWeekData.length > 0){
            for (let i = 0; i < rawWeekData.length; i++){
                tempData.push(rawWeekData[i].ph_value);
                const datetime = String(rawWeekData[i].date)
                const day = datetime.substring(8,10);
                const month = datetime.substring(5, 7);
                //const hour = datetime.substring(11,13);
                //const minute = datetime.substring(14, 16);
                const time = day + "/" + month
                tempLabels.push(time);
            }
            const data = {
                labels: tempLabels,
                datasets:[{
                    label: "PH Value",
                    data: tempData,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255,99,132,1)']
                }]
            }
            setGraphData(data);
        }
    }, [rawWeekData, props.phWeekData])

    return(
        <div>
            <Line data={graphData ? graphData : {}} options={options} />
        </div>
    )

}
