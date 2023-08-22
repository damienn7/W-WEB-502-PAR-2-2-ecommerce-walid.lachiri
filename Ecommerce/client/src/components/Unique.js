import '../style/Unique.css';
import Button from '@mui/material/Button';
import Header from './Header'
import Footer from './Footer'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Video from '../assets/Julien.mp4'
import Select from '@mui/material/Select';
import Pub from '../assets/Pub.png'
import Carousel from 'react-material-ui-carousel'
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from "react"


function Articleunique({ categorie, sous_categorie, id }) {
    const [articles, setArticles] = useState([])
    const [list, setList] = useState([])
    const [multipleCharacteristics, setMultipleCharacteristics] = useState(undefined)


    // console.log(categorie);
    // console.log(sous_categorie);

    useEffect(() => {
        fetchCharacteristics();
        fetchUserData();
        fetchArticles()
    }, [])
    // console.log(id);

    const fetchUserData = async () => {
        await fetch(`http://localhost:8000/api/articles/search/${categorie}/${sous_categorie}/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setArticles(data[0])
            })
    }


    const fetchCharacteristics = () => {
        fetch("http://127.0.0.1:8000/api/characteristic/" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setMultipleCharacteristics(data)
            })
    }

    const fetchArticles = () => {
        fetch("http://127.0.0.1:8000/api/gozizi")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setList(data)
            })
    }

    if (multipleCharacteristics !== undefined) {
        return (
            <div className="App">
                <Header />
                <div className="Unique">
                    <Grid className="Unique" container spacing={2} >
                        <Grid xs={10}>
                            {/* NOM du produit */}
                            <Typography variant='h4'>{articles.name}</Typography>
                            {/* charactéristiques courte du produit */}
                            <Typography variant='h8' sx={{ fontStyle: 'oblique', color: 'grey' }}>
                                {Object.keys(multipleCharacteristics).map((characteristic) => { 
                                    return <p>{characteristic} : {multipleCharacteristics[characteristic][0]}</p>
                                })
                                }
                            </Typography>
                            <Typography>{articles.stock} restant(s)</Typography>
                            <div className='Description'>
                                <Grid container spacing={2} disableEqualOverflow>
                                    <Grid xs={3} >
                                        {/* Image du produit */}
                                        <img src={articles.image} width='100%'></img>
                                    </Grid>
                                    <Grid xs={9} sx={{ display: 'flex' }}>
                                        {/* Description du produit */}
                                        <Typography sx={{}} >{articles.description}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            {Object.keys(multipleCharacteristics).map((characteristic) => {
                                if (multipleCharacteristics[characteristic].length > 1) {
                                    return (
                                        <FormControl variant="standard" sx={{ m: 3, minWidth: 40 }} defaultValue={'test'}>
                                            <InputLabel id="demo-simple-select-standard-label">{characteristic}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={""}
                                                label={characteristic}
                                                name={characteristic}>
                                                {multipleCharacteristics[characteristic].map((characteristicValue) => {
                                                    return (<MenuItem align="right" value={characteristicValue}>{characteristicValue}</MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>

                                    )
                                }
                                return null
                            })}

                            {/* return Category.map((key) => {
      return (<MenuItem  align="right" value={key} onClick={(event) => { getSousCategorie(event) }}>{key}</MenuItem>)
    }) */}

                        </Grid >
                        <Grid xs={1} sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-Evenly', border: 2, mx: 'auto', width: 200, height: 'auto', borderRadius: '5px' }}>
                            <div className="article__price">
                                {/* Prix du produit */}
                                <Typography color="grey">TTC</Typography>
                                <Typography variant='h3' color="red">{articles.price}€</Typography>
                                <Typography color="grey">HT</Typography>

                                <Typography variant='h6 indice' style={{ fontStyle: "italic", color: "grey" }}>{parseFloat(articles.price * 0.8).toFixed(2)}€</Typography>
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
                    <Grid container spacing={2} sx={{ display: "flex", justifyContent: 'space-Evenly' }}>
                        <Grid xs={12}>
                            <Typography align="center" fontSize={18} color="red">Les autres raclo achètent ça aussi</Typography>
                        </Grid>
                        {list.slice(0, 6).map((listed) => (
                            <Grid xs={2}>
                                <img src={listed.image} width={150} />
                                <Typography>{listed.name}</Typography>
                            </Grid>
                        ))}
                    </Grid>

                    <hr></hr>
                    <br></br>
                </div>
                <Footer />
            </div >
        );
    } else {
        return <p>LOADING...</p>
    }

}

export default Articleunique;
