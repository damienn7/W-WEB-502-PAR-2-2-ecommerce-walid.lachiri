import { Link, useRoutes } from "react-router-dom";
import App from "./Accueil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { Breadcrumbs, Stack } from "@mui/material";
import { red } from "@mui/material/colors";

/**
 *  Fil d'ariane fait en react
 * @param {*} props
 * @returns
 */
const BreadcrumbsComponent = (props) => {
  const segments = props.navigation.pathname.split("/");
  const dernierSegment = segments[segments.length - 1];
  const premierSegment = segments[0] = "acceuil";

  const fil_ariane = segments.map((segment, index) => (
    <div key={uuidv4()}>
      
      <Link style={{ 
        textDecoration: 'none', 
        fontSize: '1.4em'
        }} to={ index > 0 ? segments.slice(0, index + 1).join('/') : ''}>
        {
            segment !== premierSegment ? (  
                <span style={{ 
                    background: '#c9e4ff',
                    color: segment !== dernierSegment ? 'gray' : 'black',
                  }}
                  >
                        {decodeURIComponent(segment.replace(/-/g, " "))}
                    </span>
        ) : (
          <FontAwesomeIcon icon={faHouseUser} style={{ color: "grey"}} />
        )}
        </Link>

    </div>
  ));

  return (
    <Stack spacing={2}>
        <Breadcrumbs separator=">" aria-label="breadcrumb" style={{ display: "flex", justifyContent: 'center'}}>
            {fil_ariane}
        </Breadcrumbs>
    </Stack>
    // <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
    // </div>
  );
  // let element = useRoutes([
  //     {
  //       path: "/",
  //       element: <App />,
  //     //   children: [
  //     //     {
  //     //       path: "messages",
  //     //       element: <DashboardMessages />,
  //     //     },
  //     //     { path: "tasks", element: <DashboardTasks /> },
  //     //   ],
  //     },
  //   ]);

  //   return element;
};
export default BreadcrumbsComponent;
