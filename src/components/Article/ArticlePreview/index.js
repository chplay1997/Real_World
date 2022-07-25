import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticlePreview(props) {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        axios
            .get(`https://api.realworld.io/api/articles?${props.typeArticle}=${props.name}&limit=5&offset=0`, {
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Orgin': '*',
                    'content-type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('jwtToken'),
                },
            })
            .then((response) => {
                setArticles(response.data.articles);
            })
            .catch((err) => console.log(err));
    }, [props.typeArticle]);

    return (
        <>
            {articles.map((article, index) => (
                <div key={index} className="article-preview">
                    <div className="article-meta">
                        <Link to="">
                            <img alt="" src={article.author.image} />
                        </Link>
                        <div className="info">
                            <Link to={`/@${article.author.username}`} className="author">
                                {article.author.username}
                            </Link>
                            <span className="date">{article.createdAt}</span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                            <i className="ion-heart" /> {article.favoritesCount}
                        </button>
                    </div>
                    <Link to={`/article/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                    </Link>
                </div>
            ))}
        </>
    );
}

export default ArticlePreview;
