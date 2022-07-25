import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '~/store/UserProvider';

function Header() {
    const context = useContext(UserContext);
    const user = context.user;
    //active btn
    const active = (type) => {
        let path = window.location.pathname.split('/')[1];
        if (path === type || (path === '' && type === 'home')) {
            return 'active';
        }
        return '';
    };

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    conduit
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* <!-- Add "active" class when you're on that page" --> */}
                        <Link to="/" className={`nav-link ${active('home')}`}>
                            Home
                        </Link>
                    </li>
                    {user && (
                        <li className="nav-item">
                            <Link to="/create" className={`nav-link ${active('create')}`}>
                                <i className="ion-compose"></i>&nbsp;New Article
                            </Link>
                        </li>
                    )}

                    {user && (
                        <li className="nav-item">
                            <Link to="/settings" className={`nav-link ${active('settings')}`}>
                                <i className="ion-gear-a"></i>&nbsp;Settings
                            </Link>
                        </li>
                    )}

                    {user ? (
                        ''
                    ) : (
                        <li className="nav-item">
                            <Link to="/login" className={`nav-link ${active('login')}`}>
                                Sign in
                            </Link>
                        </li>
                    )}

                    {user ? (
                        ''
                    ) : (
                        <li className="nav-item">
                            <Link to="/register" className={`nav-link ${active('register')}`}>
                                Sign up
                            </Link>
                        </li>
                    )}

                    {user && (
                        <li className="nav-item">
                            <Link
                                to={`/@${user.username}`}
                                className={`nav-link ng-binding ${active(`@${user.username}`)}`}
                            >
                                <img alt="" src={user.image} className="user-pic" />
                                {user.username}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;
