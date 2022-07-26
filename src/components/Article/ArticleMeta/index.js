import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function ArticleMeta(props) {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.user;
    const [article, setArticle] = useState(props.article);
    console.log(article);

    const handleClickEdit = () => {
        navigate('/editor/' + article.slug, { state: article });
    };
    const handleClickDelete = () => {
        axios
            .delete(`https://api.realworld.io/api/articles/${article.slug}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Token ' + (localStorage.getItem('jwtToken') || ''),
                },
            })
            .then((response) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClickFollow = (event) => {
        if (!localStorage.getItem('jwtToken')) {
            navigate('/login');
            return;
        }
        if (article.author.following) {
            context
                .actionProfile({ target: '/follow', method: 'delete', name: article.author.username })
                .then((response) => {
                    setArticle((prev) => {
                        prev.author.following = false;
                        return { ...prev };
                    });
                });
        } else {
            axios
                .post(
                    `https://api.realworld.io/api/profiles/${article.author.username}/follow`,
                    {},
                    {
                        headers: {
                            accept: 'application/json',
                            authorization: 'Token ' + (localStorage.getItem('jwtToken') || ''),
                        },
                    },
                )
                .then((response) => {
                    setArticle((prev) => {
                        prev.author.following = true;
                        return { ...prev };
                    });
                })
                .catch((err) => err);
        }
    };
    const handleClickFavorite = async (event) => {
        if (!localStorage.getItem('jwtToken')) {
            navigate('/login');
            return;
        }
        event.target.classList.toggle('active');
        if (article.favorited) {
            const res = await context.disLike(article.slug);
            console.log(res);
            setArticle((prev) => ({
                ...prev,
                favorited: false,
                favoritesCount: prev.favoritesCount - 1,
            }));
        } else {
            const res = await context.like(article.slug);
            console.log(res);
            setArticle((prev) => ({
                ...prev,
                favorited: true,
                favoritesCount: prev.favoritesCount + 1,
            }));
        }
    };

    return (
        <div className="article-meta">
            <Link to={`/@${article.author.username}`}>
                <img alt="" src={article.author.image} />
            </Link>
            <div className="info">
                <Link to={`/@${article.author.username}`} className="author">
                    {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
            </div>
            {user.username === article.author.username ? (
                <button className="btn btn-sm btn-outline-secondary" onClick={handleClickEdit}>
                    <i className="ion-edit" />
                    &nbsp;Edit Article
                </button>
            ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleClickFollow}>
                    <i className="ion-plus-round" />
                    &nbsp; {article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
                </button>
            )}
            &nbsp;&nbsp;
            {user.username === article.author.username ? (
                <button className="btn btn-outline-danger btn-sm" onClick={handleClickDelete}>
                    <i className="ion-trash-a" /> Delete Article
                </button>
            ) : (
                <button
                    className={`btn btn-sm btn-outline-primary ${article.favorited && 'active'}`}
                    onClick={handleClickFavorite}
                >
                    <i className="ion-heart" />
                    &nbsp; Favorite Post <span className="counter">{`(${article.favoritesCount})`}</span>
                </button>
            )}
        </div>
    );
}

export default ArticleMeta;
