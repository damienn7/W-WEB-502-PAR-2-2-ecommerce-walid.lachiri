import logo from './logo.svg';
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
import { Typography } from '@mui/material';


function App() {
  return (
    <>
    <Header/>
    <div className='foutre'>
    <MCarousel/>
    </div>
    <Footer/>
    </>
    );}

    export default App;