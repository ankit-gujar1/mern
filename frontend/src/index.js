import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import Hello from './components/hello';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';


const router=createBrowserRouter([
  {path:'/',element:<App/>},
  {path:'/hello',element:<Hello/>},
  {path:'/add',element:<AddStudent/>},
  {path:'/edit/:id',element:<EditStudent/>},
  {path:'/delete/:id',element:<DeleteStudent/>},
  {path:'/login',element:<Login/>},
  {path:'/signup',element:<Signup/>},
  {path:'*',element:<NotFound/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

