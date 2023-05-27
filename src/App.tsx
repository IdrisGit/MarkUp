import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NotesList from './pages/NotesList';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NotesList />
    },
    {
      path: '/new',
      element: <h1>New Note</h1>
    },
    {
      path: '/:id',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <h2>Note</h2>
        },
        {
          path: 'edit',
          element: <h2>Edit</h2>
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to='/' replace />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
