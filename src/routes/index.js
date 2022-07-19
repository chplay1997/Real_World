//Layout
import { HeaderOnly } from '~/components/Layout';

import Home from '~/views/Home';
// import Task from '~/pages/List';
// import TemplatesBoards from '~/pages/Templates/Boards';
// import TemplatesList from '~/pages/Templates/List';
//public routes
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/boards', component: Boards },
    // { path: '/list/:idBoard', component: Task, layout: HeaderOnly },

    // { path: '/templates/boards', component: TemplatesBoards },
    // { path: '/templates/list/:idBoard', component: TemplatesList, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
