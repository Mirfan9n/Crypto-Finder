import React from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChatJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js";

ChatJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
)

const Chart=({arr=[], currency, days})=> {
    const prices = [];
    const date=[];
    
     for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }
    const data = {
            labels: date,
            datasets:[{
                label: `Price in ${currency}`,
                data: prices, borderColor:"rgb(255, 99, 163)",
                backgroundColor:"rgb(255, 99, 163, 0.5)",
            }]

        }  
    // console.log(prices);

    return( 
    <Line
        options={{
            responsive:true,
        }}
        data = {data}
    />)
}

export default Chart