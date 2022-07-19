import './App.css';
import { memo, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Routers from './router';
import { PermissionContext } from './common/permission'

import Home from './component/dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 *1000,
      retry: 0,
    }
  }
});



const Permission = memo(({ children })=>{
  const [permission, setPermission] = useState([]);
  return <PermissionContext.Provider value={permission}>{children}</PermissionContext.Provider>
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Permission>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </Permission>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
