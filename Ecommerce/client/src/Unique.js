import './style/Unique.css';
import Button from '@mui/material/Button';
import Header from './header.js'
import Footer from './footer.js'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Video from './assets/Julien.mp4'
import Pub from './assets/Pub.png'
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@mui/material';



function App() {
    return (
        <div className="App">
            <Header />
            <div className="Unique">
                <Grid className="Unique" container spacing={2} >
                    <Grid xs={10}>
                        {/* NOM du produit */}
                        <Typography variant='h4'>Sapphire PULSE AMD Radeon RX 7900 XTX 24GB</Typography>
                        {/* charactéristiques courte du produit */}
                        <Typography variant='h8' sx={{ fontStyle: 'oblique', color: 'grey' }}>24 Go GDDR6 - Dual HDMI/Dual DisplayPort - PCI Express (AMD Radeon RX 7900 XTX)</Typography>
                        <div className='Description'>
                            <Grid container spacing={2} disableEqualOverflow>
                                <Grid xs={3} >
                                    {/* Image du produit */}
                                    <img src='https://media.ldlc.com/r1600/ld/products/00/06/00/56/LD0006005688.jpg' width='100%'></img>
                                </Grid>
                                <Grid xs={9} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                    {/* Description du produit */}
                                    <Typography sx={{}} >Basée sur l'architecture RDNA 3, la carte graphique Sapphire PULSE AMD Radeon RX 7900 XTX 24GB est conçue pour le Jeu en 4K UHD. Puissante et efficace, elle ravira joueurs et créatifs à la recherche d'une solution graphique performante et novatrice.</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid >
                    <Grid xs={1} sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-Evenly', border: 2, mx: 'auto', width: 200, height: 'auto', borderRadius:'5px' }}>
                        <div className="article__price">
                            {/* Prix du produit */}
                            <Typography color ="grey">TTC</Typography>
                            <Typography variant='h3' color="red">420,69€</Typography>
                            <Typography color ="grey">HT</Typography>

                            <Typography variant='h6'>12,50€</Typography>
                        </div>
                        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-evenly' }}>
                            <Button variant="outlined" sx={{ marginBottom: "10px" }}>Ajouter au panier</Button>
                            <Button variant="contained">Acheter l'article</Button>
                        </Grid>
                        <Typography fontSize={10} color='blue'>être informé d'une baisse de prix</Typography>
                    </Grid>
                </Grid >
                <Grid container spacing={2} >
                    <Grid xs={10}>
                        <img src={Pub} width="40%" />
                    </Grid>
                    <Grid xs={2} marginTop={1} >
                        <Box>
                            <video controls autostart autoPlay src={Video} type="video/mp4" width="90%" />
                        </Box>
                    </Grid>
                </Grid>
                <hr className='Marginextop'></hr>
                <Grid container spacing={2} sx={{display: "flex", justifyContent: 'space-Evenly' }}>
                    <Grid xs={12}>
                        <Typography align="center" fontSize={18} color="red">Les autres raclo achètent ça aussi</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <img src='https://infomaxparis.com/13752-medium_default/pc-gamer-waterforce-lian-li-o11.jpg' width={150} />
                        <Typography>Los Articlos</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <img src='https://infomaxparis.com/13752-medium_default/pc-gamer-waterforce-lian-li-o11.jpg' width={150} />
                        <Typography>Los Articlos</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <img src='https://infomaxparis.com/13752-medium_default/pc-gamer-waterforce-lian-li-o11.jpg' width={150} />
                        <Typography>Los Articlos</Typography>

                    </Grid>
                    <Grid xs={2}>
                        <img src='https://infomaxparis.com/13752-medium_default/pc-gamer-waterforce-lian-li-o11.jpg' width={150} />
                        <Typography>Los Articlos</Typography>

                    </Grid>
                    <Grid xs={2}>
                        <img src='https://infomaxparis.com/13752-medium_default/pc-gamer-waterforce-lian-li-o11.jpg' width={150} />
                        <Typography>Los Articlos</Typography>

                    </Grid>
                    <Grid xs={2}>
                        <img src='https://infomaxparis.com/13752-medium_default/pc-gamer-waterforce-lian-li-o11.jpg' width={150} />
                        <Typography>Los Articlos</Typography>

                    </Grid>
                </Grid>

                <hr></hr>
                <br></br>
            </div>
            <Footer />
        </div >
    );
}

export default App;
