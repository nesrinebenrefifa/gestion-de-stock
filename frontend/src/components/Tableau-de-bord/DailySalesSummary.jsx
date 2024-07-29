import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Container, Grid, Paper } from '@mui/material';

const DailySalesSummary = () => {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchDailySalesSummary();
  }, []);

  const fetchDailySalesSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/daily-sales-summary');
      const data = response.data;
      setSales(data);
      calculateTotalSales(data);
      prepareSalesData(data);
    } catch (err) {
      console.error('Failed to fetch daily sales summary:', err);
    }
  };

  const calculateTotalSales = (sales) => {
    const total = sales.reduce((acc, sale) => acc + sale.price * sale.quantity, 0);
    setTotalSales(total);
  };

  const prepareSalesData = (sales) => {
    const groupedData = sales.reduce((acc, sale) => {
      const existing = acc.find(item => item.productName === sale.productName);
      if (existing) {
        existing.quantity += sale.quantity;
        existing.total += sale.price * sale.quantity;
      } else {
        acc.push({ productName: sale.productName, quantity: sale.quantity, total: sale.price * sale.quantity });
      }
      return acc;
    }, []);

    setSalesData(groupedData);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Résumé des ventes quotidiennes
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Total des ventes</Typography>
            <Typography variant="h4">{totalSales} dt</Typography>
          </Paper>
        </Grid>
      </Grid>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default DailySalesSummary;
