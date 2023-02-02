import logo from './logo.svg';
import './style/App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Home from './userPages/Home'
import Login from './components/General/Login';
import Register from './components/General/Register'
import { useSelector } from 'react-redux';


function App() {
  // const {isLoggedIn} = useAuth();
  const {name}=useSelector(state => state.login)
 // const   {isLoggedIn}=useAuth()
  
    const routes=createBrowserRouter([
         {
          path:'/register',
          element:<Register />
         },
         {
          path:'/login',
          element:<Login/>
         },
         {
          path:'/',
          element:<Home/>
         }

    ])

    //  useEffect(()=>{
    //      if (!name && !isLoggedIn) {
    //           <Navigate to={'/login'} replace={'true'} ></Navigate>
    //      }
    //  },[])

  return (
    <> 
         <RouterProvider router={routes} >
         <Home />
          
         </RouterProvider>   
     </>
  );
}

export default App;
