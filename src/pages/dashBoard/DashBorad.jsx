import React, {useEffect, useState} from 'react'
import Chart from '../../components/charts/Chart'
// import BarChart from './BarChart'
// import PieChart from './PieChart'
import { useSelector } from 'react-redux';
import axios from 'axios';
import './dashBoard.css'
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";


function DashBorad() {
    let history = useHistory();
    let reduxState = useSelector(state => state)
    console.log(reduxState,"reduxState")
    const [barData, setbarData] = useState()
    const [pieData, setpieData] = useState()

    let data = [21, 22, 10]
    let categories = ["INDIA", "OMAN","US"]
    let chartSpecificOptions = {
        plotOptions : {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
        }
    }
    let height = 350

    useEffect(() => {
        console.log(localStorage.getItem("token"),"token")
        let token = localStorage.getItem("token");
        if(token) {
                axios.post("http://localhost:2000/data",{
                    "email":localStorage.getItem("email")
                
            },{
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }            
            })
            .then(res => {
                setbarData(res.data.data1)
                setpieData(res.data.data2)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            localStorage.clear()
            history.push("/");
        }

    }, [])

    const handleLogOut = () => {
        localStorage.clear()
        history.push("/");
    }
    // useEe{
    //     if(local.token === null){
    //        logout	
    //    }
    //    if(local.token){
    //        axios.post(data)
    //        {
    //            Headers{
    //                Auth:Bearer local.token
    //            }
    //        }
    //    }

    return (
        <>
            <div class="topnav">
                <div onClick={handleLogOut}>Log Out</div>
            </div>
            <h2 className="name">WelCome {localStorage.getItem("fullName")}</h2>
            <div div className="dashboard-charts">
                { barData && <Chart data={barData} categories={categories} type="bar" height={height} chartSpecificOptions={chartSpecificOptions}/> }
                { pieData && <Chart data={pieData} categories={categories} type="pie" height={height} /> }
            </div>
            {console.log("dash barData",barData)}
            {console.log("dash pieData",pieData)}
        </>
    )
}

export default DashBorad
