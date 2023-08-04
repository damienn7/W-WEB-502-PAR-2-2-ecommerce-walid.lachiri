import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
// import ArticlesView from './Articles';
import Unique from './components/Unique'
import Accueil from './components/Accueil'
import admin from './components/App'  

import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
    {/* <Unique /> */}
  </BrowserRouter>
);