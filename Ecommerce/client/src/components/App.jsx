import { Breadcrumbs } from '@mui/material';
import { Route, useRoutes, useLocation } from 'react-router-dom';
import Accueil from './Accueil';
import AdminPage from './AdminPage';

function App() {
  const location = useLocation();
  
  let element = useRoutes([
    {
      path: "/",
      element: <Accueil />,
    },
    {
      path: "/admin/*",
      element: <AdminPage />
    },
    {
      path: "/model",
      element: <Breadcrumbs />
    }
  ]);

  return element;
}

export default App;