import '../style/Unique.css';
import '../style/Accueil.css'
import Button from '@mui/material/Button';
import Header from './Header'
import Footer from './Footer'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Video from '../assets/Julien.mp4'
import Pub from '../assets/Pub.png'
import Carousel from 'react-material-ui-carousel'
import MCarousel from './Carousel/Carousel.js'
import Table from './Table/Table'
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import BreadcrumbsComponent from "./breadcrumbs";


function Accueil() {
  const location = useLocation();
  const decryptData = async (encryptedData, key) => {
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, encryptedData);
  
    const textDecoder = new TextDecoder();
    return textDecoder.decode(decryptedData);
  };
  // const storedEncryptedData = localStorage.getItem('encryptedAdmin');
  //        if (storedEncryptedData) {
  //         const key = localStorage.getItem('encryptedAdmin');
  //          decryptData(new Uint8Array(storedEncryptedData.split(',')), key)
  //            .then(decrypted => {
  //             //  setData(decrypted);
  //             console.log(decrypted);
  //            })
  //            .catch(error => console.error('Erreur de déchiffrement :', error));
  //           }
  return (
    <div>
      <Header />
      <BreadcrumbsComponent navigation={location} />
      <div className="carrousel">
        <MCarousel />
      </div>
      <Box padding={10}>
        <Table></Table>
      </Box>
      <Footer />
    </div>
  );
}

export default Accueil;
