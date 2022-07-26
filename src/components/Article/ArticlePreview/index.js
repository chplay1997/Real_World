import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function ArticlePreview(props) {
    const context = useContext(UserContext);

    const [articles, setArticles] = useState('');
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
                setArticles(response.data.articles);
                context.setMessageLoading('');
            })
            .catch((err) => console.log(err));
    }, [props.typeArticle, props.name, checkLike]);

    const handleClickLike = async (e, slug, favorited) => {
        e.target.classList.toggle('active');
        if (favorited) {
            await context.disLike(slug);
        } else {
            await context.like(slug);
        }
        setCheckLike(!checkLike);
    };

    if (!articles) {
        return (
            <div className="load-wrapp">
                <div className="load-3">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        );
    } else if (context.messageLoading) {
        return <div className="article-preview">{context.messageLoading}</div>;
    }

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
