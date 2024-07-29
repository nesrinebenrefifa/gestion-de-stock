import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

  Typography,
  Container
} from '@mui/material';

const StockOverview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchStockOverview();
  }, []);

  const fetchStockOverview = async () => {
    try {
      const response = await axios.get('http://localhost:5000/stock-overview');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch stock overview:', err);
    }
  };

  return (
    <Container>
      <Typography>
        Vue densemble des stocks actuels
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du produit</TableCell>
              <TableCell align="right">Quantité</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell >
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

export default StockOverview;
