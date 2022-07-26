import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function Feed(props) {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const [checkLike, setCheckLike] = useState(false);
    const [listFeed, setListFeed] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let target = props.typeFeed === 'Your Feed' ? '/feed' : '';
            let tag = '';
            if (props.tag) {
                tag = '&tag=' + props.tag;
                target = '';
            }
            const data = await axios.get(`https://api.realworld.io/api/articles${target}?offset=0&limit=10${tag}`, {
                headers: {
                    'Content-type': '/application/json',
                    authorization: 'Token ' + (localStorage.getItem('jwtToken') || ''),
                },
            });
            setListFeed(data.data.articles);
            context.setMessageLoading('');
        };
        getData();
    }, [props.typeFeed, props.tag, checkLike]);

    const handleClickLike = async (e, slug, favorited, index) => {
        if (!localStorage.getItem('jwtToken')) {
            navigate('/login');
        }
        e.target.classList.toggle('active');
        if (favorited) {
            await context.disLike(slug);
        } else {
            await context.like(slug);
        }
        setCheckLike(!checkLike);
    };

    if (context.messageLoading) {
        return <div className="article-preview">{context.messageLoading}</div>;
    }

    return (
        <>
            {listFeed.length === 0 ? (
                <div className="article-preview">No articles are here... yet.</div>
            ) : (
                listFeed.map((feed, index) => (
                    <div className="article-preview" key={index}>
                        <div className="article-meta">
                            <Link to={`/@${feed.author.username}`}>
                                <img alt={feed.author.username} src={feed.author.image} />
                            </Link>
                            <div className="info">
                                <Link to={`/@${feed.author.username}`} className="author">
                                    {feed.author.username}
                                </Link>
                                <span className="date">{feed.createdAt}</span>
                            </div>
                            <button
                                className={`btn btn-outline-primary btn-sm pull-xs-right ${feed.favorited && 'active'}`}
                                onClick={(e) => {
                                    handleClickLike(e, feed.slug, feed.favorited, index);
                                }}
                            >
                                <i className="ion-heart" /> {feed.favoritesCount}
                            </button>
                        </div>
                        <Link to={`/article/${feed.title.replaceAll(' ', '-')}-1`} className="preview-link">
                            <h1>{feed.title}</h1>
                            <p>{feed.description}</p>
                            <span>Read more...</span>
                        </Link>
                    </div>
                ))
            )}
        </>
    );
}

export default Feed;
