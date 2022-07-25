import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function ArticleMeta(props) {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.user;

    const handleClickEdit = () => {
        navigate('/editor/' + props.article.slug, { state: props.article });
    };
    const handleClickDelete = () => {
        axios
            .delete(`https://api.realworld.io/api/articles/${props.article.slug}`, {
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Orgin': '*',
                    'content-type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('jwtToken'),
                },
            })
            .then((response) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClickFollow = (event) => {};
    const handleClickFavorite = (event) => {};

    return (
        <div className="article-meta">
            <Link to={`/@${props.article.author.username}`}>
                <img alt="" src={props.article.author.image} />
            </Link>
            <div className="info">
                <Link to={`/@${props.article.author.username}`} className="author">
                    {props.article.author.username}
                </Link>
                <span className="date">{props.article.createdAt}</span>
            </div>
            {user.username === props.article.author.username ? (
                <button className="btn btn-sm btn-outline-secondary" onClick={handleClickEdit}>
                    <i className="ion-edit" />
                    &nbsp;Edit Article
                </button>
            ) : (
                <button className="btn btn-sm btn-outline-secondary" onClick={handleClickFollow}>
                    <i className="ion-plus-round" />
                    &nbsp; Follow {props.article.author.username} <span className="counter">{`(${10})`}</span>
                </button>
            )}
            &nbsp;&nbsp;
            {user.username === props.article.author.username ? (
                <button className="btn btn-outline-danger btn-sm" onClick={handleClickDelete}>
                    <i className="ion-trash-a" /> Delete Article
                </button>
            ) : (
                <button className="btn btn-sm btn-outline-primary" onClick={handleClickFavorite}>
                    <i className="ion-heart" />
                    &nbsp; Favorite Post <span className="counter">{`(${props.article.favoritesCount})`}</span>
                </button>
            )}
        </div>
    );
}

export default ArticleMeta;
