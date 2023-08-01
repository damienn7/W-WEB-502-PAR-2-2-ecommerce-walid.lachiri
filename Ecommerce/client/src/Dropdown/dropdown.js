import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './dropdown.css'
import Button from '@mui/material/Button';


export default function SelectVariants() {
    const [Composants, setComposants] = React.useState('');

    const handleChange = (event) => {
        setComposants(event.target.value);
    };
    
    
    var Frank = '15%';
  return (
    <div className='dropdownz'>
      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Composants</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
        //   value={Composants}
        //   label="Composants"
        >
          <MenuItem value="Composants">Composants
          </MenuItem>
          <MenuItem value={"Processeur"}>Processeur</MenuItem>
          <MenuItem value={"Ventirad"}>Ventirad & AIO</MenuItem>
          <MenuItem value={"Motherboard"}>Carte mère</MenuItem>
          <MenuItem value={"RAM"}>Mémoire vive</MenuItem>
          <MenuItem value={"GPU"}>Carte graphique</MenuItem>
          <MenuItem value={"SSD"}>SSD</MenuItem>
          <MenuItem value={"HDD"}>Disque dur</MenuItem>
          <MenuItem value={"CASE"}>Boîtier</MenuItem>
          <MenuItem value={"Alimentation"}>Alimentation</MenuItem>
          <MenuItem value={"Lecteur"}>Lecteur & graveur</MenuItem>
          <MenuItem value={"Son"}>Carte son</MenuItem>
          <MenuItem value={"Réseau"}>Carte réseau</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Périphériques</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={Composants}
          label="Composants"
        >
          <MenuItem value="">Périphériques
          </MenuItem>
          <MenuItem value={"Souris"}>Souris</MenuItem>
          <MenuItem value={"Clavier"}>Clavier</MenuItem>
          <MenuItem value={"Clavier&Souris"}>Pack Clavier & Souris</MenuItem>
          <MenuItem value={"Moniteur"}>Moniteur</MenuItem>
          <MenuItem value={"Enceintes"}>Enceintes</MenuItem>
          <MenuItem value={"Webcam"}>Webcam</MenuItem>    
          <MenuItem value={"USB"}>Clef USB</MenuItem>
          <MenuItem value={"Tapis"}>Tapis de souris</MenuItem>
          <MenuItem value={"Casque"}>Casque-Micro</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Accessoires</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={Composants}
          label="Composants"
        >
          <MenuItem value="Accessoires">Accessoires
          </MenuItem>
          <MenuItem value={"Ventilateur"}>Ventilateur</MenuItem>
          <MenuItem value={"SATA"}>Câbles SATA</MenuItem>
          <MenuItem value={"OS"}>Systèmes d'exploitation</MenuItem>
          <MenuItem value={"PateThermique"}>Pâte thermique</MenuItem>
          <MenuItem value={"AirComprimé"}>Air comprimé</MenuItem>


        </Select>
      </FormControl>
      
      <Button variant="contained" className='Buttonmui'>Promotions</Button>

      <FormControl variant="standard" sx={{ m: 1, minWidth: Frank }}>
        <InputLabel id="demo-simple-select-standard-label">Composants</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={Composants}
          label="Composants"
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