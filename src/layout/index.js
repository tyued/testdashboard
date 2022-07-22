import React, { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Nav from './nav';
import css from './layout.module.scss';
import { connect } from 'react-redux';


const Layout = memo(() => {

    // const { isLoading, isError, data, error } = useQuery(['getBreadcrumb',{page: 2, limit: 5}], getBreadcrumb);

    return (
        <div className={css.Layout}>
            <Header></Header>
            <div className={css.LayoutBody}>
                <Nav></Nav>
            </div>
            {/* <div className={css.Layout_Left}>
                <Nav className={css.Nav}></Nav>
            </div>

            <div className={css.Layout_Right}>
                <Header></Header> */}
                
                {/* <Suspense fallback={<div>loading...</div>}> */}
                    {/* <div className={css.Main}>
                        <Outlet />
                    </div> */}
                {/* </Suspense> */}
            {/* </div> */}
        </div>
        
    )
})

const mapStateToProps = (state) => {
    const { app } = state;
    return { app };
}

export default connect(mapStateToProps)(Layout)
