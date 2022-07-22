import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Feed from '~/components/Feed';
import { UserContext } from '~/store/UserProvider';

function Home() {
    const context = useContext(UserContext);
    const user = context.user;

    const [typeFeed, setTypeFeed] = useState(user ? 'your' : 'global');
    const [tag, setTag] = useState('');

    //active btn
    const active = (type) => {
        if (typeFeed === type && !tag) {
            return 'active';
        }
        return '';
    };

    const handleShowYourFeed = (e) => {
        setTypeFeed('your');
        setTag('');
    };
    const handleShowGlobalFeed = (e) => {
        setTypeFeed('global');
        setTag('');
    };
    const handleTagFeed = (e) => {
        setTypeFeed('');
        setTag('');
    };
    const handleShowTag = (e) => {
        setTag(e.target.innerHTML);
    };

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {user && (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${active('your')}`}
                                            id="your-feed"
                                            to=""
                                            onClick={handleShowYourFeed}
                                        >
                                            Your Feed
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${active('global')}`}
                                        id="global-feed"
                                        to=""
                                        onClick={handleShowGlobalFeed}
                                    >
                                        Global Feed
                                    </Link>
                                </li>
                                {tag === '' || (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ng-binding active`}
                                            id="global-feed"
                                            to=""
                                            onClick={handleTagFeed}
                                        >
                                            <i className="ion-pound" /> {tag}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <Feed typeFeed={typeFeed} tag={tag} />
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    implementations
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    introduction
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    welcome
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    codebaseShow
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    angularjs
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    react
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    mean
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    node
                                </Link>
                                <Link to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                    rails
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
