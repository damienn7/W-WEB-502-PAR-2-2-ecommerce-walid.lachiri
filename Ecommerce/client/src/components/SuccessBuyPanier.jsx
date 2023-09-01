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
  const [delivertmethod, setDeliveryMethod] = useState(0);
  const [pricedelivery, setPriceDelivery] = useState(0);
  const [countryprice, setCountryPrice] = useState(0);




  const renderPanier = () => {
    // Define axios calls
    const orderDetailsRequest = axios.get(`http://localhost:8000/api/order/${id}`);
    const orderItemsRequest = axios.get(`http://localhost:8000/api/order_item/by/${id}`);
    
    // Execute both requests concurrently
    Promise.all([orderDetailsRequest, orderItemsRequest])
      .then(responses => {
        const orderDetails = responses[0].data;
        const orderItems = responses[1].data;
  
        setAddress(orderDetails.delivery_address);
        setCountry(orderDetails.country);
        setDate(orderDetails.created_at);
  
        const deliveryPrices = {
          normal: 0,
          express: 5,
          day24: 10
        };
  
        setDeliveryMethod(orderItems[0].delivery_method);
        setPriceDelivery(deliveryPrices[orderItems[0].delivery_method]);
        setArticleInPanier(orderItems);
          axios.get(`http://localhost:8000/api/shippingfee/pays/${orderDetails.country}`)
          .then((response) => {
            setCountryPrice(response.data[0].price);
            
            const total = orderItems.reduce((acc, article) => {
              return acc + article.price * (1 - article.promotion / 100);
            }, 0);
  
            const finalTotal = total + deliveryPrices[orderItems[0].delivery_method] + response.data[0].price;
            setTotalPrice(finalTotal.toFixed(0));
  
          });
  
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
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
  useEffect(() => {
    renderPanier();
  }, []);
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
        <Typography variant="h5">Pays: {country} ({countryprice}€)</Typography>
        <Typography variant="h5">Date: {new Date(date).toLocaleDateString()}</Typography>
        <Typography variant="h5">Méthode de livraison: {delivertmethod} ({pricedelivery}€)</Typography>

        <Typography variant="h5" color="primary">Prix total:{totalPrice}€</Typography>
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
                  Prix: {(article.price * (1 - article.promotion / 100)).toFixed(1)}€
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}