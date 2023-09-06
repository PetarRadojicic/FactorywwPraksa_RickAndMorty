import logo from './logo.svg';
import './App.css';
import RickAndMorty from './RickAndMorty/RickAndMorty';
import MainContentLIst from './RickAndMorty/MainContentList/MainContentList';
import Favorites         from './RickAndMorty/MainContentList/Favorites/favorites'

import Login from './RickAndMorty/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    { path: '/',element: <Login/>},
    { path: '/MainContentLIst',element: <MainContentLIst/>},
    { path: '/Favorites',element: <Favorites/>}
  ])
  
  return (
    <>
        <RouterProvider router={router}/>
    </>
  );
}

export default App;
