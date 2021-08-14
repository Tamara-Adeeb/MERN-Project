import React, {useEffect,useState} from 'react';
import axios from 'axios';
import ImgMediaCard from './ImgMediaCard';
import TabPanel from './TabPanel';
import { useHistory } from "react-router-dom";

import Button from './Button';
import {Line} from 'react-chartjs-2';
import Chart from './Chart';


const Profile = () => {
    const [technology,setTechnology] = useState([]);
    const [user,setUser] = useState(null);
    const [users,setUsers] = useState([]);
    const [render,setRender] = useState(false);
    let history = useHistory();

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

        for(let i =0 ; i< technology.length;i++){
            console.log(technology[i].activity.length)
            if(technology[i].activity.length >= 1){
                label.push(technology[i].name)
                active.push(technology[i].activity.length)
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
    
    const styleCard = {
        display: "flex",
        flexWrap: "wrap",
        paddingTop:"50px",
        justifyContent: "center",
    }

    const lineStyle = {
        width:"1000px",
        marginLeft:"100px",
    }

    const chartStyle = {
        width:"500px",
        height:"300px",
        marginTop:"70px",
        marginBottom:"50px",
        marginLeft:"75px",
        display: "inline-block"
        
    }

    const aboutStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop:"20px",
    }
    const onSelect = re => {
        if(render === true){
            setRender(false)
        }else{
            setRender(true);
        }
        
    }

    const handelClick = name => {
        history.push(`/${name}`);
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/api/technology")
        .then(res => {
            console.log(res.data)
            setTechnology(res.data)})
        .catch(err => console.log(err))
    },[render])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users")
        .then(res => {
            console.log(res.data)
            setUsers(res.data)})
        .catch(err => console.log(err))
    },[])
    return (
        <React.Fragment>
            <TabPanel style={{background:"red"}}/>
            <div style={aboutStyle}>
                <p>
                    About the Tec Community
                </p>
            </div>
            <hr style={lineStyle}></hr>
            <div style={chartStyle}>
                <Line data={data} options={options}/> 
                </div>
                <div style={chartStyle} >
                {/* <Line data={data} options={options}/> */}
                <Chart  data={users}/>
                </div>
                <hr style={lineStyle} ></hr>
            <div style={styleCard}>
            {technology.map(item => {
                return(
                    <React.Fragment key={item._id}>
                        {item.followers.indexOf("611697281141c427c4761d2e") !== -1? 
                        <React.Fragment><div><div onClick={e => handelClick(item.name)}><ImgMediaCard title={item.name} contant={item.about} img="../image/java.png"/></div><div>
                        <Button color="tomato"  id={"611697281141c427c4761d2e"} technologyId={item._id} title="UnFollow" onSelect={onSelect}/>
                        </div>
                        </div>
                        </React.Fragment>
                        :null}
                    </React.Fragment>
                )
            })}
            </div>
            <div style={styleCard}>
            {technology.map(item => {
                return(
                    <React.Fragment key={item._id}>
                        {item.followers.indexOf("611697281141c427c4761d2e") === -1? 
                        <React.Fragment><div><ImgMediaCard title={item.name} contant={item.about} img=""/>
                        <Button color="palevioletred" id={"611697281141c427c4761d2e"} technologyId={item._id} title="Follow" onSelect={onSelect}/>
                        </div>
                        </React.Fragment>:null}
                    </React.Fragment>
                )
            })}
            
        </div>
        </React.Fragment>
    )
}

export default Profile
