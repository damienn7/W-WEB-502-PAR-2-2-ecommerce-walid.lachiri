import './App.css';
import { Breadcrumbs } from '@mui/material';
import { Route, useRoutes } from 'react-router-dom';
import Accueil from './Accueil';
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

    let element = useRoutes([
        {
          path: "/",
          element: <Accueil />,
          children: [
            {
              path: location.pathname,
              element: <Accueil />,
            },
            // { 
            //     path: "tasks", 
            //     element: <DashboardTasks /> 
            // },
          ],
        },
        {
          path: location.pathname !== 'model' ? '/' : '/model',
          element: < Breadcrumbs />
        }
      ]);

      return element;
}

export default App;
