//Layout
import Home from '~/views/Home';
import LoginRegister from '~/views/LoginRegister';
import Article from '~/views/Article';
import Create from '~/views/Create';
import Settings from '~/views/Settings';
import Profile from '~/views/Profile';
//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister },
    { path: '/register', component: LoginRegister },
    { path: '/article/:title', component: Article },
    { path: '/create', component: Create },
    { path: '/settings', component: Settings },
    { path: '/@:name', component: Profile },
    { path: '/@:name/favorites', component: Profile },
    { path: '/editor/:slug', component: Create },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
