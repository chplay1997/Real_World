import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticlePreview(props) {
    const [articles, setArticles] = useState([]);
    const [checkLike, setCheckLike] = useState(false);
    useEffect(() => {
        axios
            .get(`https://api.realworld.io/api/articles?${props.typeArticle}=${props.name}&limit=5&offset=0`, {
                headers: {
                    accept: 'application/json',
                    authorization: 'Token ' + localStorage.getItem('jwtToken'),
                },
            })
            .then((response) => {
                console.log(response);
                setArticles(response.data.articles);
            })
            .catch((err) => console.log(err));
    }, [props.typeArticle, props.name, checkLike]);

    const handleClickLike = async (e, slug, favorited) => {
        e.target.classList.toggle('active');
        if (favorited) {
            const response = await props.disLike(slug);
            console.log(response);
        } else {
            const response = await props.like(slug);
            console.log(response);
        }
        setCheckLike(!checkLike);
    };

    return (
        <>
            {articles.length === 0 ? (
                <div className="article-preview">No articles are here... yet.</div>
            ) : (
                articles.map((article, index) => (
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
                            <button
                                className={`btn btn-outline-primary btn-sm pull-xs-right ${
                                    article.favorited && 'active'
                                }`}
                                onClick={(e) => {
                                    handleClickLike(e, article.slug, article.favorited);
                                }}
                            >
                                <i className="ion-heart" /> {article.favoritesCount}
                            </button>
                        </div>
                        <Link to={`/article/${article.slug}`} className="preview-link">
                            <h1>{article.title}</h1>
                            <p>{article.description}</p>
                            <span>Read more...</span>
                            <ul className="tag-list">
                                {article.tagList.map((tag, index) => (
                                    <li key={index} className="tag-default tag-pill tag-outline ng-binding ng-scope">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    </div>
                ))
            )}
        </>
    );
}

export default ArticlePreview;
