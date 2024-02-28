import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieTwo = ({ Trns }) => {
  const chartRef = useRef(null); 
  console.log(Trns);

  // Define colors
  const green = '#28a745';
  const light_green = '#77dd77';
  const light_red = '#ffcccb';
  const red = '#dc3545';

  const data = {
    labels: [
      'On Time',
      '15-30 days late',
      '30 + days late',
      'non repayment'
    ],
    datasets: [{
      label: 'Transaction Detail',
      data: [
        Trns.on_time,
        Trns.late_15_to_30,
        Trns.late_30_plus,
        Trns.non_repayment
      ],
      backgroundColor: [
        green,
        light_green,
        light_red,
        red
      ],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      radius: 200,
    }
  };
  

  useEffect(() => {
    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, config);
      return () => {
        myChart.destroy();
      };
    }
  }, [config]);

  return (
    <div className='PieTwo'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieTwo;
