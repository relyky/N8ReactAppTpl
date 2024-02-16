import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import MainLayout from './MainLayout'
import Login from './pages/Account/Login'
import Counter from './pages/Counter/AppForm'
import FetchData from './pages/FetchData/AppForm'
import Home from './pages/Home/AppHome'

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "counter", element: <Counter /> },
      { path: "fetch-data", element: <FetchData /> },
    ]
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
