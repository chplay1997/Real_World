import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ArricleActions from '~/components/Article/ArricleActions';
import ArticleMeta from '~/components/Article/ArticleMeta';
import Loading from '~/components/Loading';

function Article() {
    const { title } = useParams();
    const [article, setArticle] = useState('');

    useEffect(() => {
        axios
            .get(`https://api.realworld.io/api/articles/${title}`, {
                headers: {
                    accept: 'application/json',
                    authorization: 'Token ' + (localStorage.getItem('jwtToken') || ''),
                },
            })
            .then((response) => {
                setArticle(response.data.article);
            })
            .catch((error) => console.log(error));
    }, [title]);

    if (!article) {
        return <Loading />;
    }

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>
                    <ArticleMeta article={article} />
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <div className="ng-binding">
                            <p>{article.body}</p>
                        </div>

                        <ul className="tag-list">
                            {article.tagList.map((tag, index) => (
                                <li key={index} className="tag-default tag-pill tag-outline ng-binding ng-scope">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr />
                <div className="article-actions">
                    <ArticleMeta article={article} />
                </div>
                <ArricleActions author={article.author} title={title} />
            </div>
        </div>
    );
}

export default Article;
