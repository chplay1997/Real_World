import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '~/store/UserProvider';

function Settings() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.user;

    const [image, setImage] = useState('');
    const [username, setUsername] = useState(user ? user.username : '');
    const [bio, setBio] = useState(user ? user.bio : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        context.setUser(null);
        navigate('/');
    };
    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                            </fieldset>
                        </form>

                        <hr />
                        <button className="btn btn-outline-danger" onClick={handleLogOut}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
