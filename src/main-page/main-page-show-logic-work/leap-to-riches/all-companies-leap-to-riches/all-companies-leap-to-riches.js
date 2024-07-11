import CompaniesStockDisplay from './companies-stock-display/companies-stock-display';
import './all-companies-leap-to-riches.css';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const AllCompaniesLeapToRiches = () => {
    const [companyData, setCompanyData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/companies');
          if (!response.ok) {
            throw new Error('Не вдалося отримати дані');
          }
          const data = await response.json();
          setCompanyData(data);
        } catch (error) {
          console.error('Помилка при отриманні даних:', error);
        }
      };
  
      fetchData();
  
      const interval = setInterval(() => {
        fetchData();
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  
    const chartData = {
      labels: companyData.length > 0 ? companyData[0].data.map(point => point.x) : [],
      datasets: companyData.map(company => ({
        label: company.name,
        data: company.data.map(point => point.y),
        fill: false,
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        tension: 0.1
      }))
    };
  
    return (
      <div className="stock-chart">
        <Line data={chartData} />
      </div>
    );
};

export default AllCompaniesLeapToRiches;
