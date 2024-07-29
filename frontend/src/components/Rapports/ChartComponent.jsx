import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportGeneration = () => {
  const [reportType, setReportType] = useState('stock');
  const [period, setPeriod] = useState('daily');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        let response;
        if (reportType === 'stock') {
          response = await axios.get('http://localhost:5000/products');
        } else if (reportType === 'sales') {
          response = await axios.get(`http://localhost:5000/ventes?period=${period}`);
        } 
        // else if (reportType === 'statistics') {
        //   response = await axios.get('http://localhost:5000');
        // }
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, [reportType, period]);

  return (
    <div className="d-flex  align-items-center vh-100" 
       >
      <h2>Generate Reports</h2>
      <div>
        <label>
          Report Type:
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="stock">Stock Status</option>
            <option value="sales">Sales Report</option>
            <option value="statistics">Product Statistics</option>
          </select>
        </label>
        {reportType === 'sales' && (
          <label>
            Period:
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
        )}
      </div>
      {reportType === 'stock' && reportData && (
        <div>
          <h3>Stock Status</h3>
          <ul>
            {reportData.map((item) => (
              <li key={item._id}>{item.name}: {item.quantity}</li>
            ))}
          </ul>
        </div>
      )}
      {reportType === 'sales' && reportData && (
        <div>
          <h3>Sales Report</h3>
          <Line
            data={{
              labels: reportData.map((data) => new Date(data.date).toLocaleDateString()),
              datasets: [{
                label: 'Sales',
                data: reportData.map((data) => data.quantity * data.price),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
              }],
            }}
          />
        </div>
      )}
      {/* {reportType === 'statistics' && reportData && (
        <div>
          <h3>Product Statistics</h3>
          <Bar
            data={{
              labels: reportData.map((data) => data._id),
              datasets: [{
                label: 'Total Sales',
                data: reportData.map((data) => data.totalSales),
                backgroundColor: 'rgba(75,192,192,0.4)',
              }],
            }}
          />
        </div>
      )} */}
    </div>
  );
};

export default ReportGeneration;
