import { Link } from 'react-router-dom';

function ArticleMeta(props) {
    return (
        <div className="article-meta">
            <Link to="">
                <img alt={props.article.author} src={props.article.author.image} />
            </Link>
            <div className="info">
                <Link to="" className="author">
                    {props.article.author.username}
                </Link>
                <span className="date">{props.article.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; {`Follow ${props.article.author.username}`} <span className="counter">{`(${10})`}</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">{`(${props.article.favoritesCount})`}</span>
            </button>
        </div>
    );
}

export default ArticleMeta;
