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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="all-companies-leap-to-riches">
      {companyData.map((company) => (
        <CompaniesStockDisplay key={company.symbol} company={company} />
      ))}
    </div>
  );
};

export default AllCompaniesLeapToRiches;
