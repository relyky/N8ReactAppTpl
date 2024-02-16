import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Counter_AppForm from './pages/Counter/AppForm';
import FetchData_AppForm from './pages/FetchData/AppForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>這是首頁</div>,
  },
  {
    path: "/counter",
    element: <Counter_AppForm />,
  },
  {
    path: "/fetch-data",
    element: <FetchData_AppForm />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
