import { Breadcrumbs } from "@mui/material";
import { Outlet, Route, Routes, useParams, useRoutes } from "react-router-dom";
import Accueil from "./Accueil";
import ArticleUnique from "./Unique";
import { useLocation } from "react-router-dom";
import LoginForm from "./Connexion";
import { version } from "react";
import CreateUser from "./Inscription";
import Category from "./categorie";
import Admin from "./admin/AdminPage";
import Payment from "./Payment";

function App() {
  const location = useLocation();
  
  let categorieName = location.pathname.split('/')[3];
  let sous_categorieName = location.pathname.split('/')[4];
  let id = location.pathname.split('/')[5];

  return (
    <Routes>
      <Route path="/admin/*" element={< Admin/>} />

      <Route path="/" element={<Accueil />} />
      <Route path="/articles" element={<Accueil />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/inscription" element={< CreateUser/>} />
      <Route
        path="/articles/search/:categorie/:sub_categorie" 
        element={<Category categorie={categorieName} sous_categorie={sous_categorieName}/>}
      />
       <Route
        path="/articles/search/:categorie/:sub_categorie/:id"
        element={<ArticleUnique categorie={categorieName} sous_categorie={sous_categorieName} id={id}/>}
      />
      <Route path="/articles/search/:categorie/:sub_categorie/:id/payment" element={< Payment options={{
        categorieName: categorieName, 
        sous_categorieName: sous_categorieName,
        id: id
        }}/> } />
      <Route path="/success" element={ < Payment /> } />
    </Routes>
  );
}

export default App;