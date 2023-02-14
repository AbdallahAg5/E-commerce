import { createBrowserRouter } from "react-router-dom";
import Login from "./components/General/Login";
import Register from "./components/General/Register";
import PublicNav from "./layout/PublicNav";
import UserNav from "./layout/UserNav"
import Home from "./components/User/Home";
import PublicHome from "./components/General/Home";

const router=createBrowserRouter([
      {
        
         element:<UserNav />,
         children:[
             {
                 path:'/home',
                 element:<Home />
             }
         ]
      },
      {
         
         element:<PublicNav />,
         children:[
            {
               path:'/login',
               element:<Login />,
            },
            {
               path:'/register',
               element:<Register />
            },
            {
               path:'/',
               element:<PublicHome />
            }
         ]

      }

])

export default router