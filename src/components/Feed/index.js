import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useStore } from '~/store';

function Feed(props) {
    const [state] = useStore();
    const { user } = state;
    const [listFeed, setListFeed] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const list = await axios.get('https://api.realworld.io/api/articles/feed?offset=0&limit=10', {
                headers: {
                    'Content-type': '/application/json',
                    authorization: 'Token ' + user.token,
                },
            });
            console.log(list.data.articles);
            setListFeed(list.data.articles);
        };
        getData();
    }, [props.typeFeed]);
    return (
        <>
            {listFeed.length === 0
                ? 'No articles are here... yet.'
                : listFeed.map((feed, index) => (
                      <div className="article-preview" key={index}>
                          <div className="article-meta">
                              <Link to="profile.html">
                                  <img alt="" src={feed.author.image} />
                              </Link>
                              <div className="info">
                                  <Link to="" className="author">
                                      {feed.author.username}
                                  </Link>
                                  <span className="date">{feed.createdAt}</span>
                              </div>
                              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                  <i className="ion-heart" /> {feed.favoritesCount}
                              </button>
                          </div>
                          <Link to="" className="preview-link">
                              <h1>{feed.title}</h1>
                              <p>{feed.description}</p>
                              <span>Read more...</span>
                          </Link>
                      </div>
                  ))}
        </>
    );
}

export default Feed;
