import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Container, 
  Box,
  AppBar,
  Toolbar
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import html2pdf from "html2pdf.js";


export default function SuccessBuyPanier({ id }) {
  const [panier, setArticleInPanier] = useState([]);
  const [delivery_address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const renderPanier = () => {
    axios
      .get(`http://localhost:8000/api/order_item/by/${id}`)
      .then((response) => {
        console.table(response.data);
        setArticleInPanier(response.data);

        // Calculate total price
        const total = response.data.reduce((acc, article) => acc + article.price* (1 - article.promotion/100).toFixed(1), 0);
        setTotalPrice(total);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
      axios
      .get(`http://localhost:8000/api/order/${id}`)
      .then((response) => {
        setAddress(response.data.delivery_address);
        setCountry(response.data.country);
        setDate(response.data.created_at);
      })
  };

  useEffect(() => {
    renderPanier();
  }, []);

  const generateOrderContent = () => {
    let content = "Détails de la commande:\n\n";
    
    content += `Adresse: ${delivery_address}\n`;
    content += `Pays: ${country}\n`;
    content += `Date: ${new Date(date).toLocaleDateString()}\n`;
    content += `Prix total: ${totalPrice}€\n\n`;

    panier.forEach(article => {
      content += `Produit: ${article.name}\n`;
      content += `Description: ${article.description}\n`;
      content += `Prix: ${article.price* (1 - article.promotion/100).toFixed(1)}€\n`;
    });
    
    return content;
  };

  const handleDownload = () => {
    const element = document.body;
    const opt = {
      margin: 10,
      filename: 'details_commande.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Détails de la commande
          </Typography>
          <Button variant="outlined" color="inherit" startIcon={<FileDownloadIcon />} onClick={handleDownload}>
            Télécharger
          </Button>
        </Toolbar>
      </AppBar>

      <Box my={4}>
        <Typography variant="h5">Adresse: {delivery_address}</Typography>
        <Typography variant="h5">Pays: {country}</Typography>
        <Typography variant="h5">Date: {new Date(date).toLocaleDateString()}</Typography>
        <Typography variant="h5" color="primary">Prix total: {totalPrice}€</Typography>
      </Box>

      <Grid container spacing={3}>
        {panier.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={article.image}
                alt="image"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{article.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>{article.description}</Typography>
                <Typography variant="h6" color="primary">
                  Prix: {article.price * (1 - article.promotion / 100).toFixed(1)}€
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}