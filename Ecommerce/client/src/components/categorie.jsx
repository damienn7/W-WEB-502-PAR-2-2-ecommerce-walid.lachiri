export default function Category(props){

    // SELECT * FROM `items` INNER JOIN categories c ON c.category = "Composants" WHERE c.sub_category = "Processeur";
    return (
        <>
            <h1>{props.categorie}</h1>
            <h2>{props.sous_categorie}</h2>
        </>
    )
}   

