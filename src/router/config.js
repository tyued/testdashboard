import Login from '../component/login';
import Layout from '../layout';
import DashBoard from '../component/dashboard';

const Menu = [
    // {
    //     path: '/',
    //     title: 'Index',
    //     element: <Layout />,
    //     children: [
    //         {
    //             path: 'home',
    //             title: 'Home',
    //             // element: <Home/>,
    //             children: [
    //                 {
    //                     path: '',
    //                     title: 'Home-A',
    //                     // element: <Home />
    //                     children: [
    //                         {
    //                             path:'a',
    //                             title: 'test-a',
    //                             element: <Home />
    //                         }
    //                     ]
    //                 },{
    //                     path: 'b',
    //                     title: 'Home-B',
    //                     element: <Other />
    //                 }
                    
    //             ]
    //         },
    //         {
    //             path: 'list',
    //             title: 'List',
    //             element: <List/>
    //         },
    //         {
    //             title: 'Screen',
    //             redirect: '/summary',
    //         },
    //     ]
    // },
    {
        path: '/login',
        title: 'login',
        element: <Login />,
        isMenu: false,
    },
    {
        path:'/',
        title: 'root',
        element: <Layout />,
        children:[
            {
                path:'dashboard',
                title: 'DashBoard',
                element: <DashBoard />,
                isMenu: false,
            },
            {
                path:'merchant',
                title: 'Merchant Summary',
                element: <DashBoard />,
                isMenu: false,
            },
        ]
    }
    
]




export default Menu;