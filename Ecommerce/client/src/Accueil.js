import './style/Unique.css';
import './style/Accueil.css'
import Button from '@mui/material/Button';
import Header from './header.js'
import Footer from './footer.js'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Video from './assets/Julien.mp4'
import Pub from './assets/Pub.png'
import Carousel from 'react-material-ui-carousel'
import MCarousel from './Carousel/Carousel.js'
import Table from './Table/Table'
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import BreadcrumbsComponent from "./components/breadcrumbs";


function Accueil() {
  const location = useLocation();
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
