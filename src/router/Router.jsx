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
import Details from "../pages/Details/Details";
import UpdateItems from "../pages/UpdateItems/UpdateItems";
import PrivateRoute from "../privateRout/PrivateRoute";
import NotFound from "../component/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<NotFound/>, 
    children: [
      {
        path: "/",
        element: <Home /> 
      },
      {
        path:'allItems',
        element:<LostAndFound/>,
        loader:() =>fetch('https://lost-and-found-server-ecru.vercel.app/lost')
      },
      {
        path:'myItems',
        element:<PrivateRoute><MyItems/></PrivateRoute>
      },
      {
        path:'addItems',
        element:<PrivateRoute><AddItems/></PrivateRoute>
      },
      {
          path: "/updateItems/:id",
          element: <PrivateRoute><UpdateItems /></PrivateRoute>,
      },
      {
        path:'allRecovered',
        element:<PrivateRoute><AllRecovered/></PrivateRoute>
      },
      {
        path: 'see-details/:id',
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const response = await fetch(`https://lost-and-found-server-ecru.vercel.app/see-details/${params.id}`);
          return response.json();
        },
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
