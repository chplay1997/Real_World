import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Feed from '~/components/Feed';
import PopularTag from '~/components/PopularTag';
import { UserContext } from '~/store/UserProvider';

function Home() {
    const context = useContext(UserContext);
    const [typeFeed, setTypeFeed] = useState(context.user ? 'Your Feed' : 'Global Feed');
    const [tag, setTag] = useState('');

    //active btn
    const active = (type) => {
        if (typeFeed === type && !tag) {
            return 'active';
        }
        return '';
    };

    //Handle click set Type Feed view
    const handleSetTypeFeed = (e) => {
        setTypeFeed(e.target.innerHTML);
        setTag('');
        context.setMessage(e);
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
                                {context.user && (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${active('Your Feed')}`}
                                            to=""
                                            onClick={handleSetTypeFeed}
                                        >
                                            Your Feed
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${active('Global Feed')}`}
                                        to=""
                                        onClick={handleSetTypeFeed}
                                    >
                                        Global Feed
                                    </Link>
                                </li>
                                {tag === '' || (
                                    <li className="nav-item">
                                        <Link className={`nav-link ng-binding active`} id="global-feed" to="">
                                            <i className="ion-pound" /> {tag}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <Feed typeFeed={typeFeed} tag={tag} />
                    </div>

                    <PopularTag setTag={setTag} tag={tag} />
                </div>
            </div>
        </div>
    );
}

export default Home;
