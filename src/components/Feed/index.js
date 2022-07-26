import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function Feed(props) {
    const context = useContext(UserContext);
    const jwtToken = localStorage.getItem('jwtToken');
    const [checkLike, setCheckLike] = useState(false);

    const [listFeed, setListFeed] = useState([]);
    useEffect(() => {
        if (!jwtToken) {
            return;
        }
        const getData = async () => {
            let target = '';
            let tag = '';
            if (props.typeFeed === 'your') {
                target = '/feed';
            }
            if (props.tag) {
                tag = '&tag=' + props.tag;
            }
            const data = await axios.get(`https://api.realworld.io/api/articles${target}?offset=0&limit=10${tag}`, {
                headers: {
                    'Content-type': '/application/json',
                    authorization: 'Token ' + jwtToken,
                },
            });
            console.log(data);
            setListFeed(data.data.articles);
        };
        getData();
    }, [props.typeFeed, props.tag, checkLike]);

    const handleClickLike = async (e, slug, favorited, index) => {
        e.target.classList.toggle('active');
        if (favorited) {
            const response = await context.disLike(slug);
            // setListFeed(prev=>([...prev,]))
            console.log(response);
        } else {
            const response = await context.like(slug);
            console.log(response);
        }
        setCheckLike(!checkLike);
    };

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
