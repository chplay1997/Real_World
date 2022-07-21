import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '~/store/UserProvider';

function FormSetting() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.user;

    const [image, setImage] = useState('');
    const [username, setUsername] = useState(user ? user.username : '');
    const [bio, setBio] = useState(user ? user.bio : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        if (context.isEmail(email) && context.isPassword(password)) {
            axios
                .put(`https://api.realworld.io/api/user`, {
                    user: {
                        email: email,
                        token: user.token,
                        username: username,
                        bio: bio,
                        image: image,
                    },
                    headers: {
                        'content-type': 'application/json',
                        authorization: 'Token' + user.token,
                    },
                })
                .then((response) => {
                    console.log(response);
                    // localStorage.setItem('user', JSON.stringify(response.data.user));
                    // context.setUser(response.data.user);
                    // navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                    // setMessages(Object.entries(err.response.data.errors));
                    // setShowMessage(true);
                });
        }
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
                        placeholder="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <textarea
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                        value={bio || ''}
                        onChange={(e) => {
                            setBio(e.target.value);
                        }}
                    ></textarea>
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
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
