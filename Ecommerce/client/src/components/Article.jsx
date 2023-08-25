import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { Container, Card, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Article({ article }) {
  return article.map(article => (
    <Link
      to={`http://localhost:3000/articles/search/${article.category}/${article.sub_category}/${article.id}`}
      key={article.id} style={{ textDecoration: "none" }}
    >
      <div style={{ margin: "0 auto", color: "black" }}>
        <div
          style={{
            backgroundColor: "bluecyan",
            border: "1px solid black",
            padding: "1em",
          }}
        >
          <h1 style={{ fontSize: "1.4em" }}>{article.name}</h1>
          <div style={{ display: "flex" }}>
            <img src={article.image} width={200} style={{borderRadius:"5px", border:"solid 1px black", boxShadow:"5px 5px 5px black"}} />
            <div style={{ marginLeft: "30px" }}>
              <h2 style={{ fontSize: "1em" }}>{article.description}</h2>
              <div style={{ position: "absolute", right: "10px" }}>
                <h5 style={{color:"red", fontSize:"34px", marginLeft:"5em"}}>{article.price}€</h5>
                <h4 style={{color:"grey",fontSize:"16px", fontWeight:"lighter"}}>{Math.ceil(article.views*0.002)} utilisateurs regardent cet article</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));
}
