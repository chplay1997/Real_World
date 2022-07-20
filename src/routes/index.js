//Layout
import Home from '~/views/Home';
import Login from '~/views/Login';
import Register from '~/views/Register';
import Article from '~/views/Article';
import Create from '~/views/Create';
import Settings from '~/views/Settings';
//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Login', component: Login },
    { path: '/register', component: Register },
    { path: '/article', component: Article },
    { path: '/create', component: Create },
    { path: '/settings', component: Settings },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
