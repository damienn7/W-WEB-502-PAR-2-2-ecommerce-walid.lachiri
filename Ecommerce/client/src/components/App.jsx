import { Breadcrumbs } from "@mui/material";
import { Route, Routes, useParams, useRoutes } from "react-router-dom";
import Accueil from "./Accueil";
import { useLocation } from "react-router-dom";
import LoginForm from "./Connexion";
import { Children } from "react";
import CreateUser from "./Inscription";
import Category from "./categorie";

function App() {
  const location = useLocation();

  // useRoutes([
  //   {
  //     path: '/articles/search/:categorie/:sub_categorie',
  //     element: <Accueil />,
  //   }
  // ]);
  //   // articles/search/{category}/{sub_category}/{search}
  let categorieName = location.pathname.split('/')[3];
  let sous_categorieName = location.pathname.split('/')[4];
  
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/inscription" element={< CreateUser/>} />
      {/* <Route path="/articles/search/:categorie/:sub_categorie/search" */}
      {/* <Route path="/articles/search/" element={<Accueil />} /> */}
      <Route
        path="/articles/search/:categorie/:sub_categorie"
        element={<Category categorie={categorieName} sous_categorie={sous_categorieName}/>}
      />
    </Routes>
  );
}

export default App;
