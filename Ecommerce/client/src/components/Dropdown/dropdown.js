import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./dropdown.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";

export default function SelectVariants() {
  const [composants, setComposants] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const getSousCategorie = (event) => {
    setComposants(event.target);

    let categorie = event.target.parentElement.parentElement.parentElement
      .getAttribute("id")
      .split("-")[1];
    let sous_categorie = event.currentTarget.dataset.value;

    window.location.href = `/articles/search/${categorie}/${sous_categorie}`;
  };

  useEffect(() => {
    //On récupère toutes les catégories. Chaque catégorie est un tableau qui contient toutes ses sous-catégories
    fetch("http://127.0.0.1:8000/api/categoriess")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data)
        setCategoryList(data);
      });
  }, []);

  const displayDropdown = (Category) => {
    //Ca c'est ce qui permet d'afficher toutes les sous catégories
    return Category.map((key, index) => (
      <MenuItem
        align="right"
        value={key}
        key={index}
        onClick={(event) => {
          getSousCategorie(event);
        }}
      >
        {key}
      </MenuItem>
    ));
  };

  var Frank = "15%";

  return (
    <div className="dropdownz">
      {/* Et là on affiche chaque catégorie qui va appeler la fonction displayDropdown qui montrera toutes les sous catégories de la catégorie, téma le paramètre */}
      {Object.keys(categoryList).map((Category, index) => {
        return (
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: Frank }}
            defaultValue={"test"}
            key={index}
          >
            <InputLabel id="demo-simple-select-standard-label">
              {Category}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={""}
              label={Category}
              name={Category}
            >
              {displayDropdown(categoryList[Category])}
            </Select>
          </FormControl>
        );
      })}
    </div>
  );
}
