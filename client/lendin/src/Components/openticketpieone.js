import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Dataset {
    constructor(label, data) {
      this.label = label;
      this.data = data;
      this.backgroundColor = 'rgb(255, 99, 132)';
    }
  }
  
  const PieOne = ({ data_ticketAll }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const datasets = [{
        label: 'Loan Details',
        data: data_ticketAll.map(ticket => {
          const date = new Date(ticket.Date_created);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return { x: year, y: month, r: 10 }; // Assuming r value as constant 100 for each bubble
        }),
        backgroundColor: 'rgb(255, 99, 132)'
      }];
      console.log(datasets);
  
      const config = {
        type: 'bubble',
        data: { datasets },
        options: {
          scales: {
            x: {
              type: 'linear',
              min: 2018,
              max: 2026
            },
            y: {
              type: 'linear',
              min: 1,
              max: 12,
              ticks: {
                stepSize: 1,
                callback: (value, index, values) => {
                  return monthNames[index];
                }
              }
            }
          }
        }
      };
  
      if (chartRef.current) {
        const myChart = new Chart(chartRef.current, config);
        return () => {
          myChart.destroy();
        };
      }
    }, [data_ticketAll]);
  
    return (
      <div className='PieOne'>
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };

  export default PieOne;