import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Grid,

} from '@mui/material';

const LowStockAlerts = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchLowStockAlerts();
    fetchTotalProducts();
  }, []);

  const fetchLowStockAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/low-stock-alerts');
      setLowStockProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch low stock alerts:', err);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setTotalProducts(response.data.length);
    } catch (err) {
      console.error('Failed to fetch total products:', err);
    }
  };

  const lowStockPercentage = ((lowStockProducts.length / totalProducts) * 100).toFixed(2);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Alertes de stock bas
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Produits en stock bas</Typography>
            <Typography variant="h4">{lowStockProducts.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Pourcentage de stock bas</Typography>
            <Typography variant="h4">{lowStockPercentage}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produit</TableCell>
              <TableCell align="right">Quantité</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lowStockProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LowStockAlerts;
