import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Inicial from './pages/Inicial.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Login from './pages/Login.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Carrinho from './pages/Carrinho.jsx'
import CadastrarProduto from './pages/CadastrarProduto.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Inicial/>
      },
      {
        path: "/cadastrar",
        element: <Cadastro/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/carrinho",
        element: <Carrinho/>
      },
      {
        path: "/produto",
        element: <CadastrarProduto/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

