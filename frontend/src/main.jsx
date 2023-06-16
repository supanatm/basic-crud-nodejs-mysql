import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from './pages/Books.jsx'
import CreateBook from './pages/CreateBook.jsx'
import EditBook from './pages/EditBook.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />
  },
  {
    path: "/creatbook",
    element: <CreateBook />
  },
  {
    path: "/editbook/:id",
    element: <EditBook />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
