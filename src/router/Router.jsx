import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Register from "../component/Register";
import Login from "../component/Login";
import LostAndFound from "../pages/LostAndFound/LostAndFound";
import MyItems from "../pages/MyItems/MyItems";
import AllRecovered from "../pages/AllRecovered/AllRecovered";
import AddItems from "../pages/AddItems/AddItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        path: "/",
        element: <Home /> 
      },
      {
       path:'allItems',
       element:<LostAndFound/>
      },
      {
        path:'myItems',
        element:<MyItems/>
      },
      {
        path:'addItems',
        element:<AddItems/>
      },
      {
        path:'allRecovered',
        element:<AllRecovered/>
      },
      {
        path: "auth", 
        element: <Auth />,
        children: [
          {
            path: "login", 
            element: <Login />
          },
          {
            path: "register", 
            element: <Register />
          }
        ]
      }
    ]
  },
]);

export default router;
