import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';

function Chart({data, categories, type, height, chartSpecificOptions}) {
    console.log("chartSpecificOptions",chartSpecificOptions)
    console.log("data",data)

    const [chartData, setchartData] = useState(
        {
            series: [{
                data: []
              }],
            options: {
              chart: {
                height: 350,
                type: type,
              },
              // fill: {
              //   colors: ['skyblue', 'yellow', 'lightgreen']
              // },
              dataLabels: {
                enabled: true,
        
              },
              legend: {
                show: true,
                position: 'bottom'
              },
              labels : ['INDIA', 'OMAN', 'US'],
              colors: [
                "#9e54b0",
                "#015ff1",
                "#ff9300"
              ],
              xaxis: {
                categories: categories,
                labels: {
                  style: {
                    colors: [
                      "#9e54b0",
                      "#015ff1",
                      "#ff9300"
                    ],
                    fontSize: '12px'
                  }
                }
              }
            },
        }
    )

    useEffect(() => {
        if(chartSpecificOptions !== undefined) {
            chartData.options = {
                ...chartData.options,
                chartSpecificOptions
            }
        }
        if(type === "pie"){
          console.log("pie data chart",data)
            console.log("entered pie")
            chartData.series = data
            // chartData.options.legend.labels = ['INDIA', 'OMAN', 'US']
        }
        if(type === "bar"){
            console.log("bar data chart",data)
            console.log("entered bar")
            chartData.series[0].data = data
        }
        setchartData({...chartData})

    }, [chartSpecificOptions,type])

    return (
        <div>
            {console.log("chartData",chartData)}
            <ReactApexChart options={chartData.options} series={chartData.series} type={type} height={height} />
        </div>
    )
}

export default Chart
