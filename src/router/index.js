import { memo } from 'react'
import { useRoutes } from "react-router-dom";
import routes from './config';

export default memo(() => {   
    const elements = useRoutes(routes);
    return elements
})