import React from "react";
import { Line } from "react-chartjs-2";

export default class phLineChartComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rawWeekData: props.phWeekData,
            data : [],
            labels: []
        };

        if (this.state.rawWeekData){
            let labels = [];
            let data = [];
            for(const item in this.state.rawWeekData){
                if(item.Time.slice(11, 13) === "08" || item.Time.slice(11, 13) === "22"){
                    data.append(item.PH);
                    data.append(item.Time);
                }
            }
            this.setState({
                data: data,
                labels: labels
            });
        }
    }
    data = {
        labels: this.state.labels ? this.state.labels : [],
        datasets:[{
            data: this.state.data ? this.state.data : []
        }]
    }

    render(){
        return(
            <>
                {console.log(this.data)}
                <Line data={this.data}></Line>
            </>
        )
    }
}