import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function FormSetting() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.user;

    const [image, setImage] = useState(user.image || '');
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio || '');
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const [messages, setMessages] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        if (!context.isEmail(email) || (!context.isPassword(password) && password.length > 0)) {
            console.log('ERROR!');
            return;
        }
        context
            .sendData({
                image,
                username: username || user.username,
                bio,
                email: email || user.email,
                password,
                api: 'https://api.realworld.io/api/user',
                method: 'put',
                navigate,
                path: '/',
                token: user.token,
            })
            .then((err) => {
                console.log(err);
            });

        // if (context.isEmail(email)) {
        //     axios
        //         .put(
        //             `https://api.realworld.io/api/user`,
        //             {
        //                 user: {
        //                     image: image,
        //                     username: username || user.username,
        //                     bio: bio,
        //                     email: email || user.email,
        //                     password: password || '',
        //                 },
        //             },
        //             {
        //                 headers: {
        //                     Accept: 'application/json',
        //                     'Access-Control-Allow-Orgin': '*',
        //                     'content-type': 'application/json',
        //                     Authorization: 'Token ' + user.token,
        //                 },
        //             },
        //         )
        //         .then((response) => {
        //             console.log(response);
        //             localStorage.setItem('user', JSON.stringify(response.data.user));
        //             context.setUser(response.data.user);
        //             // navigate('/');
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             // setMessages(Object.entries(err.response.data.errors));
        //             // setShowMessage(true);
        //         });
        // }
    };

    return (
        <form>
            <fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder={user.username}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <textarea
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                        value={bio}
                        onChange={(e) => {
                            setBio(e.target.value);
                        }}
                    ></textarea>
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder={user.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New password"
                        minLength="8"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" onClick={handleUpdateUser}>
                    Update Settings
                </button>
            </fieldset>
        </form>
    );
}

export default FormSetting;
