import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { Login } from "./pages/Login/Login";
import { MainContentLIst } from "./pages/MainContentList/MainContentList";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/MainContentLIst", element: <MainContentLIst /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
