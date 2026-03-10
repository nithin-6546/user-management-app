import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import AddUser from './components/AddUser'
import UserList from './components/UserList'
import User from './components/User'

function App({children}) {

  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },{
          path:"add-user",
          element:<AddUser/>
        },
        {
          path:"user-list",
          element:<UserList/>
        },
        {
          path:"user",
          element:<User/>
        }
      ]
    }
  ])
  return <RouterProvider router={routerObj}/>
}

export default App