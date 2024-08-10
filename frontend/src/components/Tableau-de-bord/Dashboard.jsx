import {  Typography } from '@mui/material';
import StockOverview from './StockOverview';
import DailySalesSummary from './DailySalesSummary';
import LowStockAlerts from './LowStockAlerts';
import Home from './Home';

const Dashboard = () => {
  return (
    <div>
      
        <Home/>
        <div  style={{ marginLeft:'287px', padding: '20px', flex: 1 }}>
      <DailySalesSummary />
      <Typography variant="h4" gutterBottom>
      Vue d'ensemble des stocks actuels
      </Typography>
      <StockOverview />
      <LowStockAlerts />
      </div>
    </div>
  );
};

export default Dashboard;
