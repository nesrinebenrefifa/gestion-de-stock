/* eslint-disable react/prop-types */
// import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Ventes',
                data: data.sales,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rapport des ventes',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default ChartComponent;
