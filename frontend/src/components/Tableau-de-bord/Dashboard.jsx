
import StockOverview from './StockOverview';
import DailySalesSummary from './DailySalesSummary';
import LowStockAlerts from './LowStockAlerts';
import Home from './Home';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Home/>
      <div style={{ display: 'flex',  alignItems: 'flex-start', width: '80%', maxWidth: '800px' }}>
        <DailySalesSummary />
        
        <StockOverview />
        <LowStockAlerts />
      </div>
    </div>
  );
};

export default Dashboard;
