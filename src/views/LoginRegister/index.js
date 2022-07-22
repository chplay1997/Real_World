import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MesseagesError from '~/components/MesseagesError';
import { UserContext } from '~/store/UserProvider';

function LoginRegister() {
    let path = window.location.pathname.split('/')[1];
    const context = useContext(UserContext);
    const navigate = useNavigate();

    //User input data
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState('');

    //Handle on submit login or register
    const HanldeOnSubmit = (e) => {
        //Validate email and password
        if (!context.isEmail(email) || !context.isPassword(password)) {
            setMessages([['Username or password', [' is valid!']]]);
            return;
        }
        e.preventDefault();
        const api = 'https://api.realworld.io/api/users';
        context
            .sendData({
                userName,
                email,
                password,
                api: path === 'login' ? api + '/login' : api,
                method: 'post',
                navigate,
                path: '/',
            })
            .then((err) => {
                if (err) setMessages(err);
            });
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{path === 'login' ? 'Sign in' : 'Sign up'}</h1>
                        <p className="text-xs-center">
                            {path === 'login' ? (
                                <Link to={'/register'}>Need an account?</Link>
                            ) : (
                                <Link to={'/login'}>Have an account?</Link>
                            )}
                        </p>

                        {messages ? <MesseagesError err={messages} /> : ''}

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
                                            setMessages('');
                                            setUserName(e.target.value);
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
                                        setMessages('');
                                        setEmail(e.target.value);
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
                                        setMessages('');
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
