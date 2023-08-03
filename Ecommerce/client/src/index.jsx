import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import ArticlesView from './Articles';
import Unique from './Unique'
import Accueil from './Accueil'
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
    {/* <Unique /> */}
  </BrowserRouter>
);