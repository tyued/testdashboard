import Login from '../component/login';

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
        title: 'Title',
        element: <Login />,
        isMenu: false,
    }
    
]




export default Menu;