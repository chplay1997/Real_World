import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Feed(props) {
    const [listFeed, setListFeed] = useState([]);
    let global = 'https://conduit.productionready.io/api/articles/feed?limit=10&offset=0';
    let target = 'https://api.realworld.io/api/articles?limit=10&offset=0&tag=introduction';
    useEffect(() => {
        const getData = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            let target = '';
            let tag = '';
            if (props.typeFeed == 'your') {
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
            console.log(data.data);
            setListFeed(data.data.articles);
        };
        getData();
    }, [props.typeFeed, props.tag]);

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
