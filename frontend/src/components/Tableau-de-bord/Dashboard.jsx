import { Container, Typography } from '@mui/material';
import StockOverview from './StockOverview';
import DailySalesSummary from './DailySalesSummary';
import LowStockAlerts from './LowStockAlerts';
import Home from './Home';

const Dashboard = () => {
  return (
    <div>
      <Container>
        <Home/>
        <div  style={{ marginLeft:'287px', padding: '20px', flex: 1 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>
      <StockOverview />
      <DailySalesSummary />
      <LowStockAlerts />
      </div>
    </Container></div>
  );
};

export default Dashboard;
