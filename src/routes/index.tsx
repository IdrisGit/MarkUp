import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import NoteLayout from '@layouts/NoteLayout';
import ErrorPage from '@components/ErrorPage';
import { Note, NewNote, EditNote } from '@features/Notes';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <></>,
          errorElement: <ErrorPage />,
        },
        {
          path: 'new',
          element: <NewNote />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/:id',
          element: <NoteLayout />,
          children: [
            {
              index: true,
              element: <Note />,
            },
            {
              path: 'edit',
              element: <EditNote />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: `${import.meta.env.BASE_URL}`,
  },
);
