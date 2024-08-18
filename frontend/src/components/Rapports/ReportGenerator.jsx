
import ChartComponent from './ChartComponent';
import Home from '../Tableau-de-bord/Home';

const ReportGenerator = () => {
 



  return (
    <div>
      <Home/>
      <div>
        <div id="chart-container">
          <ChartComponent />
        </div>
       
      </div>
    </div>
  );
};

export default ReportGenerator;
