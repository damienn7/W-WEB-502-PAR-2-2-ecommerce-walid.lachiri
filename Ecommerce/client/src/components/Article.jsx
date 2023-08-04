import { Container, Card, TableCell, TableRow } from "@mui/material";

export default function Article({ article }) {
  return article.map((article, index) => (
    <div key={index} style={{backgroundColor: "blue", display: "flex", flexDirection: 'column', margin: '0 auto'}} >
        <div style={{ backgroundColor: 'bluecyan', border: '1px solid black', padding: '1em'}}>
          <h1 style={{ fontSize: '1.4em'}}>{article.name}</h1>
          <h2 style={{ fontSize: '1em'}}>{article.description}</h2>
          <img src={article.image} width={300} />
          <h4>{article.views}</h4>
          <h5>{article.price}</h5>
          <h5>{article.price}</h5>
        </div>
    </div>
  ));
  // { article.map(article => (
  // //     <TableRow key={article.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
  // //     <TableCell component="th" scope="row">{article.name}</TableCell>
  // //     <TableCell align="right">{article.category}</TableCell>
  // //     <TableCell align="right">{article.sub_category}</TableCell>
  // //     <TableCell align="right">
  // //       {random()}/5
  // //     </TableCell>
  // //     <TableCell align-self="right">{isAvailable(article.stock)}</TableCell>
  // //     <TableCell align="right">{article.price}€</TableCell>
  // //   </TableRow>
  // )) }
  // <Container style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center'}}>
  //     <Card style={{ backgroundColor: 'black', color: 'white'}}>test</Card>
  //     <Card style={{ backgroundColor: 'black', color: 'white'}}>test2</Card>
  // </Container>
}
