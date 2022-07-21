import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '~/store/UserProvider';

function LoginRegister() {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    let path = window.location.pathname.split('/')[1];

    //call api and send messages error
    const sendData = (e, target, userName) => {
        e.preventDefault();
        axios
            .post(`https://api.realworld.io/api/users${target}`, {
                user: {
                    username: userName,
                    email: email,
                    password: password,
                },
            })
            .then((response) => {
                localStorage.setItem('jwtToken', response.data.user.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                context.setUser(response.data.user);
                navigate('/');
            })
            .catch((err) => {
                setMessages(Object.entries(err.response.data.errors));
                setShowMessage(true);
            });
    };

    //Handle on submit login or register
    const HanldeOnSubmit = (e) => {
        const regexEmail =
            // eslint-disable-next-line
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

        const regexPassword = /[a-zA-Z0-9]{8,}/;
        if (email.match(regexEmail) && password.match(regexPassword)) {
            if (path === 'login') {
                sendData(e, '/login');
            } else if (path === 'register') {
                sendData(e, '', userName);
            } else {
                e.preventDefault();
                setShowMessage(true);
            }
        } else {
            setMessages([['Username or password', [' is valid!']]]);
            setShowMessage(true);
        }
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{path === 'login' ? 'Sign in' : 'Sign up'}</h1>
                        <p className="text-xs-center">
                            {path === 'login' ? (
                                <Link to={'/register'}>{'Need an account?'}</Link>
                            ) : (
                                <Link to={'/login'}>{'Have an account?'}</Link>
                            )}
                        </p>

                        {showMessage && (
                            <ul className="error-messages">
                                {messages.map((mes, index) => (
                                    <li key={index}>{mes[0] + ' ' + mes[1]}</li>
                                ))}
                            </ul>
                        )}

                        <form>
                            {path === 'register' && (
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        value={userName}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                            setShowMessage(false);
                                        }}
                                    />
                                </fieldset>
                            )}
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setShowMessage(false);
                                    }}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    minLength="8"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setShowMessage(false);
                                        setPassword(e.target.value);
                                    }}
                                />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" onClick={HanldeOnSubmit}>
                                {path === 'register' ? 'Sign up' : 'Sign in'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
