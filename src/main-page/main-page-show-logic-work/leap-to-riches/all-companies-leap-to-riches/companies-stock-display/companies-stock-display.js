import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CompaniesStockDisplay = ({ company }) => {
    const chartData = {
        labels: company.data.map(point => point.x),
        datasets: [
            {
                label: company.name,
                data: company.data.map(point => point.y),
                fill: false,
                borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                tension: 0.1,
            },
        ],
    };
    return (

        <div className="company-chart">
            <h3>{company.name}</h3>
            <Bar data={chartData} />
        </div>

    );
};

export default CompaniesStockDisplay;
