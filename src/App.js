// node_module absolute imports go on top, then below we place our local imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';


import { Login } from './pages/Login/Login';
import MainContentLIst from './pages/MainContentList/MainContentList';
import { Favorites } from './pages/Favorites/favorites';

function App() {

  // Router i njegova logika ide u zasebnu komponentu, routes.tsx, koja moze da stoji unutar src foldera
  const router = createBrowserRouter([
    { path: '/',element: <Login/>},
    { path: '/MainContentLIst',element: <MainContentLIst/>},
    { path: '/Favorites',element: <Favorites/> }
  ])
  
  return (
    <>
        <RouterProvider router={router}/>
    </>
  );
}

export default App;
