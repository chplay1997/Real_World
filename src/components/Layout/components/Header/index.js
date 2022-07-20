import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* <!-- Add "active" class when you're on that page" --> */}
                        <Link to="/" className="nav-link active">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create" className="nav-link">
                            <i className="ion-compose"></i>&nbsp;New Article
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/settings" className="nav-link">
                            <i className="ion-gear-a"></i>&nbsp;Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Sign in
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            Sign up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
