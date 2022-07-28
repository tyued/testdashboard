import React, { memo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Tree } from 'antd';
import { DashboardOutlined, ShopOutlined, ProfileOutlined, TableOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { find } from 'lodash';
import MenuList from '../../router/config.js';
import css from '../layout.module.scss';
import { useQuery } from 'react-query';
import { getMultilayer } from '../../api/index';

const { DirectoryTree } = Tree;

const NavItem = memo(({to,children}) => {
    if(to) {
        return <Link to={to} className={css.navItem}>{children}</Link>
    } else {
        return <div className={css.navItem}>{children}</div>
    }
})

const Nav = memo(({app, dispatch}) => {
    const history = useNavigate(); 
    const hierarchyId = sessionStorage.getItem('hierarchyId');
    const session_id = sessionStorage.getItem('session_id');
    const rootMerchant = sessionStorage.getItem('hierarchyName');

    const [treeData, setTreeData] = useState([
        { title: rootMerchant, key: hierarchyId, icon: <ShopOutlined />},
    ]);
    
    // const { isLoading, isError, data, error } = useQuery(['getMultilayer',{parent_id: hierarchyId, session_id}], getMultilayer);tabc

    // console.log(app.hierarchyTree)
    
    const rootMenu = find(MenuList,{path:'/'}).children;
    // const rootMenu = MenuList;
    // const onLoadData = ({ key, children}) => {
    //     console.log(key, children, 'onLoadData');
    // }

    const updateTreeData = (list, key, children) => {
        // console.log(list, 'list')
        return list.map((node) => {
            if (node.key == key) {
              return { ...node, children };
            }
        
            if (node.children) {
                return { ...node, children: updateTreeData(node.children, key, children) };
            }
            return node;
        })
    }

    const onLoadData = async ({ key, children }) => {
        return new Promise(async (resolve) => {
            if (children) {
            resolve();
                return;
            }
            let res = await getMultilayer({parent_id: key, session_id});
            let fetchList = res.data.childrens_data.map(item => {
                return {
                    ...item,
                    title: item.value,
                    key: item.id,
                    merchantId: item.merchantId,
                    isLeaf: (item.children && item.children.length>0) ? false : true,
                    children:null,
                    icon: item.children ? <ShopOutlined /> : <ProfileOutlined />,
                }
            })
            // dispatch({type:'app/setState',payload:{
            //     hierarchyTree: updateTreeData(app.hierarchyTree, key, fetchList)
            // }})
            setTreeData((origin) => updateTreeData(origin, key, fetchList));
            resolve();
        })
        // let res = await getMultilayer({parent_id: hierarchyId, session_id})
        
        // console.log(res,'res-----')
        // console.log(key, children)
        // return 
    }

    const selectMerchant = (key, { selectedNodes, node }) => {
        if(node.merchantId){
            sessionStorage.setItem('curHierarchyId', key);
            history(`/merchant/${node.merchantId}`);
        }
        console.log(key, 'key');
        console.log(selectedNodes, 'selectedNodes');
        console.log(node, 'node');
    }
  

    useEffect(() => {
        // history.listen(function (location) { … })
        // dispatch({type:'app/setState',payload:{
        //     hierarchyTree: [{ title: rootMerchant, key: hierarchyId, icon: <DashboardOutlined />}],
        // }})
        // console.log('layout')
    }, [])

    // const createMenu = (menu=[], parentRoot) => {
    //     // console.log(parentRoot, 'parentRoot');
    //     return menu.map((item) => {
    //         // console.log(item, 'item')
    //         if (item.children) {
    //             return (
    //                 <Menu.SubMenu key={Math.random()} title={item.title}>
    //                     {createMenu(item.children, parentRoot+'/'+item.path)}
    //                 </Menu.SubMenu>
    //             )
    //         } else {
    //             return (<Menu.Item key={Math.random()}>
    //                 <Link to={item.path ? (parentRoot + '/' + item.path).replaceAll('//','/') : item.redirect}>{item.title}</Link>
    //             </Menu.Item>)  
    //         }
    //     })
    // }

    return (
        <div className={css.Nav}>
            {/* <Menu mode="inline">
                {createMenu(rootMenu, '')}
            </Menu> */}
            {/* {console.log(treeData, 'Render-treeData')} */}

            <NavItem to='dashboard'>
                <div className={css.NavItemBox}><DashboardOutlined /><span className={css.title}>DashBoard</span></div>
            </NavItem>
            {/* <NavItem><ShopOutlined /> <span className={css.title}>Merchant</span></NavItem> */}

            <DirectoryTree rootClassName={css.Tree} onSelect={selectMerchant} loadData={onLoadData} treeData={treeData} />

            <NavItem to='alltransactions'>
                <div className={css.NavItemBox}><TableOutlined /><span className={css.title}>All Transactions Search</span></div>
            </NavItem>
            

        </div>
    )
})

const mapStateToProps = (state) => {
    const { app } = state;
    return { app };
}

export default connect(mapStateToProps)(Nav)