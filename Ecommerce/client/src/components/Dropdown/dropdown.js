import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './dropdown.css'
import Button from '@mui/material/Button';
import { useState } from "react";
import { Link, redirect } from 'react-router-dom';

export default function SelectVariants() {
    const [composants, setComposants] = useState('');

    const getSousCategorie = (event) => {
        setComposants(event.target);

        let categorie = event.target.parentElement.parentElement.parentElement.getAttribute('id').split('-')[1]
        let sous_categorie = event.currentTarget.dataset.value;

        window.location.href = `/articles/search/${categorie}/${sous_categorie}`;
    };
    
    
    var Frank = '15%';
  return (
    <div className='dropdownz'>
      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }} defaultValue={'test'}>
        <InputLabel id="demo-simple-select-standard-label">Composants</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={""}
          label="Composants"
          name='Composants'
        >
          <MenuItem value="Composants">Composants
          </MenuItem>
          <MenuItem value={"Processeur"} onClick={(event) => {getSousCategorie(event)}}>Processeur</MenuItem>
          <MenuItem value={"Ventirad"} onClick={(event) => {getSousCategorie(event)}}>Ventirad & AIO</MenuItem>
          <MenuItem value={"Motherboard"} onClick={(event) => {getSousCategorie(event)}}>Carte mère</MenuItem>
          <MenuItem value={"RAM"} onClick={(event) => {getSousCategorie(event)}}>Mémoire vive</MenuItem>
          <MenuItem value={"GPU"} onClick={(event) => {getSousCategorie(event)}}>Carte graphique</MenuItem>
          <MenuItem value={"SSD"} onClick={(event) => {getSousCategorie(event)}}>SSD</MenuItem>
          <MenuItem value={"HDD"} onClick={(event) => {getSousCategorie(event)}}>Disque dur</MenuItem>
          <MenuItem value={"CASE"} onClick={(event) => {getSousCategorie(event)}}>Boîtier</MenuItem>
          <MenuItem value={"Alimentation"} onClick={(event) => {getSousCategorie(event)}}>Alimentation</MenuItem>
          <MenuItem value={"Lecteur"} onClick={(event) => {getSousCategorie(event)}}>Lecteur & graveur</MenuItem>
          <MenuItem value={"Son"} onClick={(event) => {getSousCategorie(event)}}>Carte son</MenuItem>
          <MenuItem value={"Réseau"} onClick={(event) => {getSousCategorie(event)}}>Carte réseau</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Périphériques</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={""}
          label="Peripheriques"
          name='Peripheriques'
        >
          <MenuItem value="">Périphériques
          </MenuItem>
          <MenuItem value={"Souris"}  onClick={(event) => {getSousCategorie(event)}}>Souris</MenuItem>
          <MenuItem value={"Clavier"}  onClick={(event) => {getSousCategorie(event)}}>Clavier</MenuItem>
          <MenuItem value={"Clavier&Souris"}  onClick={(event) => {getSousCategorie(event)}}>Pack Clavier & Souris</MenuItem>
          <MenuItem value={"Moniteur"}  onClick={(event) => {getSousCategorie(event)}}>Moniteur</MenuItem>
          <MenuItem value={"Enceintes"}  onClick={(event) => {getSousCategorie(event)}}>Enceintes</MenuItem>
          <MenuItem value={"Webcam"}  onClick={(event) => {getSousCategorie(event)}}>Webcam</MenuItem>    
          <MenuItem value={"USB"}  onClick={(event) => {getSousCategorie(event)}}>Clef USB</MenuItem>
          <MenuItem value={"Tapis"}  onClick={(event) => {getSousCategorie(event)}}>Tapis de souris</MenuItem>
          <MenuItem value={"Casque"}  onClick={(event) => {getSousCategorie(event)}}>Casque-Micro</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Accessoires</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={""}
          label="Accessoires"
          name='Accessoires'
        >
          <MenuItem value="Accessoires">Accessoires
          </MenuItem>
          <MenuItem value={"Ventilateur"} onClick={(event) => {getSousCategorie(event)}}>Ventilateur</MenuItem>
          <MenuItem value={"SATA"} onClick={(event) => {getSousCategorie(event)}}>Câbles SATA</MenuItem>
          <MenuItem value={"OS"} onClick={(event) => {getSousCategorie(event)}}>Systèmes d'exploitation</MenuItem>
          <MenuItem value={"PateThermique"} onClick={(event) => {getSousCategorie(event)}}>Pâte thermique</MenuItem>
          <MenuItem value={"AirComprimé"} onClick={(event) => {getSousCategorie(event)}}>Air comprimé</MenuItem>


        </Select>
      </FormControl>
      
      <Button variant="contained" className='Buttonmui'>Promotions</Button>

      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Placeholder</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={""}
          label="placeholder"
          name="Placeholder"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained"  className='Buttonmui'>Services</Button>
    </div>
    
  );
}