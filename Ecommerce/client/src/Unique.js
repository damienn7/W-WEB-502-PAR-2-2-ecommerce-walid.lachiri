import logo from './logo.svg';
import './style/Unique.css';
import Button from '@mui/material/Button';
import Header from './header.js'
import Footer from './footer.js'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Typography } from '@mui/material';



function App() {
    return (
        <div className="App">
            <Header />
            <div className="Unique">
                <Grid container spacing={2}>
                    <Grid xs={9}>
                        {/* NOM du produit */}
                        <Typography variant='h4'>Sapphire PULSE AMD Radeon RX 7900 XTX 24GB</Typography>
                        {/* charactéristiques courte du produit */}
                        <Typography variant='h8' sx={{fontStyle: 'oblique'}}>24 Go GDDR6 - Dual HDMI/Dual DisplayPort - PCI Express (AMD Radeon RX 7900 XTX)</Typography>
                        <div className='Description'>
                            <Grid container spacing={2} disableEqualOverflow>
                                <Grid xs={3} >
                                    {/* Image du produit */}
                                    <img src='https://media.ldlc.com/r1600/ld/products/00/06/00/56/LD0006005688.jpg' width='100%'></img>
                                </Grid>
                                <Grid xs={9} sx={{ display: 'flex', alignItems:'center', justifyContent: 'end'}}>
                                    {/* Description du produit */}
                                    <Typography sx={{}} >Basée sur l'architecture RDNA 3, la carte graphique Sapphire PULSE AMD Radeon RX 7900 XTX 24GB est conçue pour le Jeu en 4K UHD. Puissante et efficace, elle ravira joueurs et créatifs à la recherche d'une solution graphique performante et novatrice.</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid >
                    <Grid xs={3}>
                        {/* Prix du produit */}
                        <Typography variant='h3'>420,69€</Typography>
                        <Typography variant='h6'>12,50€</Typography>
                        <div>
                            <Button variant="outlined">Ajouter au panier</Button>
                        </div>
                        <div>
                            <Button variant="contained">Acheter l'article</Button>
                        </div>
                        <Typography color='blue'>être informé d'une baisse de prix</Typography>
                    </Grid>
                </Grid >
            </div>
            <Footer />
        </div >
    );
}

export default App;
