import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';
import ArticlePreview from '~/components/Article/ArticlePreview';
import Loading from '~/components/Loading';

function Profile() {
    const context = useContext(UserContext);
    const user = context.user;

    const { name } = useParams();
    const [profile, setProfile] = useState('');
    const [typeArticle, setTypeArticle] = useState('author');

    //action following
    const actionProfile = (input) => {
        return axios[input.method](`https://api.realworld.io/api/profiles/${name}${input.target}`, {
            headers: {
                accept: 'application/json',
                authorization: 'Token ' + localStorage.getItem('jwtToken'),
            },
        })
            .then((response) => response)
            .catch((err) => err);
    };

    useEffect(() => {
        actionProfile({ method: 'get', target: '' }).then((response) => {
            if (response.data.hasOwnProperty('profile')) {
                console.log(response.data.profile);
                setProfile(response.data.profile);
            } else {
                console.log(response);
            }
        });
    }, [name]);

    //Handle click follow or unfollow
    const handleClickFollow = (e) => {
        if (profile.following) {
            actionProfile({ target: '/follow', method: 'delete' }).then((response) => {
                console.log(response);
            });
            setProfile((prev) => ({ ...prev, following: false }));
        } else {
            axios
                .post(
                    `https://api.realworld.io/api/profiles/${name}/follow`,
                    {},
                    {
                        headers: {
                            accept: 'application/json',
                            authorization: 'Token ' + localStorage.getItem('jwtToken'),
                        },
                    },
                )
                .then((response) => response)
                .catch((err) => err);
            setProfile((prev) => ({ ...prev, following: true }));
        }
    };

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

    if (!profile) {
        return <Loading />;
    }
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
                                <button
                                    className="btn btn-sm btn-outline-secondary action-btn"
                                    onClick={handleClickFollow}
                                >
                                    <i className="ion-plus-round" />
                                    &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
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
                                    <Link className="nav-link active" to={`/@${name}`} onClick={handleShowArticle}>
                                        My Articles
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/@${name}/favorites`} onClick={handleShowArticle}>
                                        Favorited Articles
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <ArticlePreview
                            name={name}
                            typeArticle={typeArticle}
                            like={context.like}
                            disLike={context.disLike}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
