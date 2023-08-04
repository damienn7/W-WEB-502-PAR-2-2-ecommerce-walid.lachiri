import axios from "axios";
import { useLocation } from "react-router-dom";
import PrimarySearchAppBar from "./Header";
import StickyFooter from "./Footer";
import BreadcrumbsComponent from "./breadcrumbs";
import Article from "./Article";
import { useState, useEffect } from "react";

export default function Category(props) {
  const [getData, setData] = useState([]);

  const location = useLocation();

  const fetchDatas = () => {
    axios
    .get(
      `http://localhost:8000/api/articles/search/${props.categorie}/${props.sous_categorie}`
    )
    .then((axiosReponse) => {
      return axiosReponse.data
    })
    .then((reponse) => setData(reponse));
  }
    useEffect(() => {
      fetchDatas()
    }, []);
  
  return (
    <>
      <PrimarySearchAppBar />
      <BreadcrumbsComponent navigation={location} />
      <Article article={getData}/>
      <StickyFooter />
    </>
  );
}
