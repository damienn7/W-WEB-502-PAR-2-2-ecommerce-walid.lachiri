import '../style/payment.css';
import jwt_decode from "jwt-decode";

function Payment(props) {
  let decodeJson = jwt_decode(props.token)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#7ea3e7', marginTop: '1em', padding: '1em' }}>
        <h1 style={{ textAlign:'center', fontSize: '2em', fontFamily: 'monospace' }}>Produit acheté :  {decodeJson.name}</h1>
        <h2 style={{ fontSize: '1.5em', fontFamily: 'monospace'}}>Description du produit : {decodeJson.description}</h2>
        <div className="image" style={{ display:'flex', justifyContent: 'center'}}>
          <img src={decodeJson.image} alt="image" height={300} width={300} style={{ objectFit: 'cover'}}/>
        </div>
        <h3>Prix de l'article : {decodeJson.price}</h3>
        <h3>Stock de l'article : {decodeJson.stock}</h3>
        <h3>Nombre de vue de l'article: {decodeJson.views}</h3>
      </div>
    </div>
  )
}
export default Payment;