import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';
import ArticlePreview from '~/components/Article/ArticlePreview';

function Profile() {
    const context = useContext(UserContext);
    const user = context.user;

    const { name } = useParams();
    const [profile, setProfile] = useState('');
    const [typeArticle, setTypeArticle] = useState('author');

    useEffect(() => {
        console.log('run');
        axios
            .get('https://api.realworld.io/api/profiles/' + name)
            .then((response) => {
                setProfile(response.data.profile);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [name]);

    const handleShowArticle = (e) => {
        e.target.classList.add('active');
        if (e.target.textContent === 'My Articles') {
            setTypeArticle('author');
            e.target.parentNode.nextElementSibling.firstChild.classList.remove('active');
        } else if (e.target.textContent === 'Favorited Articles') {
            setTypeArticle('favorited');
            e.target.parentNode.previousElementSibling.firstChild.classList.remove('active');
        }
    };
    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img alt="" src={profile.image} className="user-img" />
                            <h4>{profile.username}</h4>
                            <p>{profile.bio}</p>

                            {user.username === profile.username ? (
                                <Link
                                    to="/settings"
                                    className="btn btn-sm btn-outline-secondary action-btn"
                                    ng-show="$ctrl.isUser"
                                >
                                    <i className="ion-gear-a" /> Edit Profile Settings
                                </Link>
                            ) : (
                                <button className="btn btn-sm btn-outline-secondary action-btn">
                                    <i className="ion-plus-round"></i>
                                    &nbsp; Follow Eric Simons
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        to={`/@${user.username}`}
                                        onClick={handleShowArticle}
                                    >
                                        My Articles
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={`/@${user.username}/favorites`}
                                        onClick={handleShowArticle}
                                    >
                                        Favorited Articles
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <ArticlePreview name={name} typeArticle={typeArticle} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
