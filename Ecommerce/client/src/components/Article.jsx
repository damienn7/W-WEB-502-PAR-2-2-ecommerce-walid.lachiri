import { Container, Card, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

export default function Article({ article }) {
  return article.map((article, index) => (
    <Link
      to={`http://locahost:8000/api/articles/search/${article.category}/${article.sub_category}/${article.id}`}
    >
      <div key={index} style={{ margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "bluecyan",
            border: "1px solid black",
            padding: "1em",
          }}
        >
          <h1 style={{ fontSize: "1.4em" }}>{article.name}</h1>
          <h2 style={{ fontSize: "1em" }}>{article.description}</h2>
          <img src={article.image} width={300} />
          <h4>{article.views}</h4>
          <h5>{article.price}</h5>
          <h5>{article.stock}</h5>
        </div>
      </div>
    </Link>
  ));
}
