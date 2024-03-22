import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Hello from './hello';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';

const router=createBrowserRouter([
  {path:'/',element:<App/>},
  {path:'/hello',element:<Hello/>},
  {path:'/add',element:<AddStudent/>},
  {path:'/edit/:id',element:<EditStudent/>},
  {path:'/delete/:id',element:<DeleteStudent/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

