import React from 'react'
import {Line} from 'react-chartjs-2';

const Chart = props => {
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const lastFiveMonth = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    if(currentMonth >= 5){
        for(let i = currentMonth; i>(currentMonth-5); i--){
                lastFiveMonth.push(monthNames[i]); 
            }
        }else{
        const remanMonth = (currentMonth-5)+11;
        for(let i = currentMonth; i> 0; i--){
                lastFiveMonth.push(monthNames[i]); 
            }
            for(let i = 11; i> remanMonth; i--){
                lastFiveMonth.push(monthNames[i]); 
            }
        }
        var label = []
        const active = []

        for(let i =0 ; i< props.data.length;i++){
            console.log(props.data[i].activity.length)
            if(props.data[i].activity.length >= 1){
                label.push(props.data[i].userName)
                active.push(props.data[i].activity.length)
            }
        }
        
        const data = {
            labels: lastFiveMonth,
            datasets:[
                {
                    label:label[0],
                    data:[active[0],0,0,0,0],
                    borderColor:['#eb9634'],
                    backgroundColor: ['#eb9634'],
                    pointBackgroundColor:'#eb9634',
                    pointBorderColor: '#eb9634'
                },
                {
                    label:label[1],
                    data:[active[1],0,0,0,0],
                    borderColor:['#dbeb34'],
                    backgroundColor: ['#dbeb34'],
                    pointBackgroundColor:'#dbeb34',
                    pointBorderColor: '#dbeb34'
                },
                {
                    label:label[2],
                    data:[active[2],0,0,0,0],
                    borderColor:['#3468eb'],
                    backgroundColor: ['#3468eb'],
                    pointBackgroundColor:'#3468eb',
                    pointBorderColor: '#3468eb'
                }
            ]
        }
        const options = {
            title: {
                display:true,
                text: "Tec Activety"
            },
            scales: {
                yAxes:[
                    {
                        ticks:{
                            min:0,
                            max:6,
                            stepSize: 1
                        }
                    }
                ]
            }
        }
    
    return (
        <div>
            <Line data={data} options={options}/>
        </div>
    )
}

export default Chart
