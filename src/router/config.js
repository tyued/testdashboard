import Login from '../component/login';
import Layout from '../layout';
import DashBoard from '../component/dashboard';
import Merchant from '../component/merchant';
import AllTransactions from '../component/allTransactions';

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
                path:'merchant/:mid',
                title: 'Merchant Summary',
                element: <Merchant />,
                isMenu: false,
            },
            {
                path:'merchant/',
                title: 'Merchant Summary',
                element: <Merchant />,
                isMenu: false,
            },
            {
                path:'alltransactions',
                title: 'AllTransactions',
                element: <AllTransactions />,
                isMenu: false,
            },
        ]
    }
    
]




export default Menu;