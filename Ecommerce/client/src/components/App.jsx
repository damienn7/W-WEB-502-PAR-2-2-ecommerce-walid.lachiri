import { Breadcrumbs } from "@mui/material";
import { Outlet, Route, Routes, useParams, useRoutes } from "react-router-dom";
import Accueil from "./Accueil";
import ArticleUnique from "./Unique";
import { useLocation } from "react-router-dom";
import LoginForm from "./Connexion";
import { version } from "react";
import CreateUser from "./Inscription";
import Panier from "./Panier";
import Category from "./categorie";
import Admin from "./admin/AdminPage";
import Profile from "./user/Profile";
import Command from "./Command";
import CommandDetail from "./CommandDetail";
import Payment from "./Payment";
import PaymentForm from "./PaymentForm";
import React, { useEffect, useState } from "react";
import AFKVID from "../assets/DOOMSDAY.gif";
import SuccessBuyPanier from "./SuccessBuyPanier";

function App() {
  const location = useLocation();
  
  let categorieName = location.pathname.split('/')[3];
  let sous_categorieName = location.pathname.split('/')[4];
  let id = location.pathname.split('/')[5];
  
  function PageNotFound() {
    return (
      <div style={{width:"100%", height:"100vh", overflowY:"hidden"}} onClick={() => window.location = "/"}>
      <img src={AFKVID} height="100%" width="100%"></img>
   {/* <p>404 Page not found</p> */}
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/admin/*" element={< Admin />} />

      <Route path="/" element={<Accueil />} />
      <Route path="/articles" element={<Accueil />} />


      <Route path="/login" element={<LoginForm />} />
      <Route path="/inscription" element={< CreateUser/>} />
      <Route path="/panier" element={<Panier/>}/>

      <Route path="/signin" element={<LoginForm />} />
      <Route path="/signup" element={< CreateUser />} />

      <Route
        path="/articles/search/:categorie/:sub_categorie"
        element={<Category categorie={categorieName} sous_categorie={sous_categorieName} />}
      />
      <Route
        path="/articles/search/:categorie/:sub_categorie/:id"
        element={<ArticleUnique categorie={categorieName} sous_categorie={sous_categorieName} id={id} />}
      />
      <Route path="/*" element={<PageNotFound />}
      />
      <Route path="/myprofile" element={<Profile/>}/>
      <Route path="/command" element={<Command/>}/>
      <Route path="/command/detail/:id" element={<CommandDetail/>}/>
      <Route path="/articles/search/:categorie/:sub_categorie/:id/payment" element={< Payment options={{
        categorieName: categorieName,
        sous_categorieName: sous_categorieName,
        id: id
      }} />} />
      <Route path="/success/:token"
        element={
          < Payment
            token={location.pathname.split('/')[2]}
          />
        }
      />

      <Route path="/successBuyPanier/:id" element={ < SuccessBuyPanier id={location.pathname.split('/')[2]} />}/>
      <Route path="/paymentForm/:categorie/:sub_categorie/:id" element={ < PaymentForm categorie={location.pathname.split('/')[2]} sous_categorie={location.pathname.split('/')[3]} id={location.pathname.split('/')[4]}/>} />
    </Routes>
  );
}

export default App;