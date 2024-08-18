import { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportGenerationAndStatistics = () => {
  const [reportType, setReportType] = useState("stock");
  const [period, setPeriod] = useState("daily");
  const [reportData, setReportData] = useState([]);
  const [statisticsData, setStatisticsData] = useState({
    topSelling: [],
    leastSelling: [],
  });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        let response;
        if (reportType === "stock") {
          response = await axios.get("http://localhost:5000/products");
          setReportData(response.data);
        } else if (reportType === "sales") {
          response = await axios.get(
            `http://localhost:5000/ventes?period=${period}`
          );
          setReportData(response.data);
        } else if (reportType === "statistics") {
          response = await axios.get("http://localhost:5000/statistics");
          setStatisticsData(response.data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du rapport:",
          error
        );
      }
    };

    fetchReportData();
  }, [reportType, period]);

  const calculateLowStock = (quantity) => quantity <= 10; // Ajuster le seuil si nécessaire

  const getChartData = (data) => ({
    labels: data.map((item) => item.productName),
    datasets: [
      {
        label: "Ventes Totales",
        data: data.map((item) => item.totalSales),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Bleu foncé
          "rgba(75, 192, 192, 0.7)", // Cyan foncé
          "rgba(153, 102, 255, 0.7)", // Violet foncé
          "rgba(255, 159, 64, 0.7)", // Orange foncé
          "rgba(255, 99, 132, 0.7)", // Rouge foncé
          "rgba(201, 203, 207, 0.7)", // Gris foncé
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Bleu foncé
          "rgba(75, 192, 192, 1)", // Cyan foncé
          "rgba(153, 102, 255, 1)", // Violet foncé
          "rgba(255, 159, 64, 1)", // Orange foncé
          "rgba(255, 99, 132, 1)", // Rouge foncé
          "rgba(201, 203, 207, 1)", // Gris foncé
        ],
        borderWidth: 1,
      },
    ],
  });

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Rapport Général', 105, 20, null, null, 'center');

    if (reportType === "stock" && reportData.length > 0) {
      doc.text('État des Stocks', 20, 40);

      doc.autoTable({
        startY: 50,
        head: [['Nom du Produit', 'Description', 'Quantité', 'Prix dAchat', 'Prix de Vente', 'Fournisseur', 'Alertes de Stock']],
        body: reportData.map(item => [
          item.name,
          item.description,
          item.quantity,
          item.purchasePrice.toFixed(2),
          item.salePrice.toFixed(2),
          item.supplier,
          calculateLowStock(item.quantity) ? 'Stock Bas' : 'Stock Suffisant'
        ]),
      });
    }

    if (reportType === "sales" && reportData.length > 0) {
      doc.text('Rapport de Ventes', 20, doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 50);

      const chartElement = document.getElementById('sales-chart');
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 70, 180, 100);
      }
    }

    if (reportType === "statistics" && statisticsData.topSelling.length > 0) {
      doc.text('Statistiques des Produits', 20, doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 50);

      const chartElement = document.getElementById('statistics-chart');
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 70, 180, 100);
      }
    }

    doc.save('rapport_general.pdf');
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="report-container">
        <h2>Générer des Rapports</h2>
        <div className="dropdown-container">
          <div className="select-container">
            <label>
              Type de Rapport :
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="stock">État des Stocks</option>
                <option value="sales">Rapport de Ventes</option>
                <option value="statistics">Statistiques des Produits</option>
              </select>
            </label>
            {reportType === "sales" && (
              <label>
                Période :
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </label>
            )}
          </div>
        </div>

        {reportType === "stock" && reportData.length > 0 && (
          <div>
            <h3>État des Stocks</h3>
            <table>
              <thead>
                <tr>
                  <th>Nom du Produit</th>
                  <th>Description</th>
                  <th>Quantité</th>
                  <th>Prix dAchat</th>
                  <th>Prix de Vente</th>
                  <th>Fournisseur</th>
                  <th>Alertes de Stock</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.purchasePrice.toFixed(2)}</td>
                    <td>{item.salePrice.toFixed(2)}</td>
                    <td>{item.supplier}</td>
                    <td>
                      {calculateLowStock(item.quantity) ? (
                        <span style={{ color: "red" }}>Stock Bas</span>
                      ) : (
                        <span style={{ color: "green" }}>Stock Suffisant</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === "sales" && reportData.length > 0 && (
          <div id="sales-chart">
            <h3>Rapport de Ventes</h3>
            <Line
              data={{
                labels: reportData.map((data) =>
                  new Date(data.date).toLocaleDateString()
                ),
                datasets: [
                  {
                    label: "Ventes",
                    data: reportData.map((data) => data.quantity * data.price),
                    borderColor: "rgba(0, 0, 128, 1)",
                    fill: false,
                  },
                ],
              }}
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        )}

        {reportType === "statistics" &&
          statisticsData.topSelling.length > 0 && (
            <div id="statistics-chart" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div className="chart-item">
                <h4>Produits les Plus Vendus</h4>
                <Pie data={getChartData(statisticsData.topSelling)} />
              </div>
              <div className="chart-item">
                <h4>Produits les Moins Vendus</h4>
                <Pie data={getChartData(statisticsData.leastSelling)} />
              </div>
            </div>
          )}

        <button onClick={generatePDF} style={{ marginTop: '20px' }}>
          Télécharger le Rapport en PDF
        </button>
      </div>
    </div>
  );
};

export default ReportGenerationAndStatistics;
