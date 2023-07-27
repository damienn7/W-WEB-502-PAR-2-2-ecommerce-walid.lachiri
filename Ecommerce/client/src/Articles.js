import React, { useEffect, useState } from "react";

const ArticleList = ({ currentArticle }) => {
    const { title, description, price, category } = currentArticle;
    return (
        <>
            <h1>{title}</h1>
            <i>{description}</i>
            <p>{price}</p>
            <p>{category}</p>
        </>
    )
}

const ArticlesView = () => {
    const [articleItems, setArticleItems] = useState([]);
    console.log("test")
    useEffect(() => {
        const getArticles = async () => {
            const res = await fetch("http://127.0.0.1:8000/articles");
            const getData = await res.json();
            console.log(getData)
            setArticleItems(getData);
        }
    })
    const article_items =
        // Ici on mettra le retour de la db qui sera passé en paramètre du .map()
        [
            {
                "title": "NVIDIA RTX 4080",
                "description": "c'est cher sa mère",
                "price": "1000",
                "category": "gpu"
            },
            {
                "title": "RADEON 7900 XT",
                "description": "c'est cher sa mère",
                "price": "1000",
                "category": "gpu"
            }
            ,
            {
                "title": "BranliX 2000",
                "description": "c'est cher sa mère",
                "price": "1000",
                "category": "gpu"
            }
        ]


    return (
        <>
            {articleItems.map((currentArticle, index) => (
                <ArticleList key={index} currentArticle={currentArticle} />
            ))}
        </>
    )
}

export default ArticlesView;
