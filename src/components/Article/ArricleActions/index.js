import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function ArricleActions(props) {
    const context = useContext(UserContext);
    const user = context.user;

    const [comments, setComments] = useState([]);
    const [inputComment, setInputComment] = useState('');

    useEffect(() => {
        axios
            .get(`https://api.realworld.io/api/articles/${props.title}/comments`, {
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Orgin': '*',
                    'content-type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('jwtToken'),
                },
            })
            .then((response) => {
                setComments(response.data.comments);
            })
            .catch((error) => console.log(error));
    }, [props.title]);

    //Handle click post comments
    const handlePostComment = (e) => {
        e.preventDefault();
        if (!inputComment.trim()) {
            setInputComment('');
            return;
        }
        axios
            .post(
                `https://api.realworld.io/api/articles/${props.title}/comments`,
                {
                    comment: {
                        body: inputComment,
                    },
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Access-Control-Allow-Orgin': '*',
                        'content-type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('jwtToken'),
                    },
                },
            )
            .then((response) => {
                setInputComment('');
                setComments((prev) => [...prev, response.data.comment]);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                    <div className="card-block">
                        <textarea
                            className="form-control"
                            placeholder="Write a comment..."
                            rows="3"
                            value={inputComment}
                            onChange={(e) => {
                                setInputComment(e.target.value);
                            }}
                        />
                    </div>
                    <div className="card-footer">
                        <img alt="" src={user.image} className="comment-author-img" />
                        <button className="btn btn-sm btn-primary" onClick={handlePostComment}>
                            Post Comment
                        </button>
                    </div>
                </form>

                {comments.map((comment, index) => (
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
