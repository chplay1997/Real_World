import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '~/store/UserProvider';

function ArricleActions(props) {
    const context = useContext(UserContext);
    const user = context.user;
    const [component, setComponent] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.realworld.io/api/articles/${props.title}/comments`)
            .then((response) => {
                // setArticle(response.data.article);
                console.log(response.data.comments);
                setComponent(response.data.comments);
            })
            .catch((error) => console.log(error));
    }, [props.title]);
    return (
        <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                    <div className="card-block">
                        <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                    </div>
                    <div className="card-footer">
                        <img alt="" src={user.image} className="comment-author-img" />
                        <button className="btn btn-sm btn-primary">Post Comment</button>
                    </div>
                </form>

                {component.map((comment, index) => (
                    <div className="card" key={index}>
                        <div className="card-block">
                            <p className="card-text">{comment.body}</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/@${comment.author.username}`} className="comment-author">
                                <img alt="" src={comment.author.image} className="comment-author-img" />
                            </Link>
                            &nbsp;
                            <Link to={`/@${comment.author.username}`} className="comment-author">
                                {comment.author.username}
                            </Link>
                            <span className="date-posted">{comment.createdAt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArricleActions;
