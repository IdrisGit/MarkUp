import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import { useStore } from './store/store';
import MainLayout from './Layouts/MainLayout';
import NotesList from './pages/NotesList';
import NewNote from './pages/NewNote';
import NoteLayout from './Layouts/NoteLayout';
import Note from './pages/Note';
import EditNote from './pages/EditNote';
import ErrorPage from './pages/ErrorPage';

function App() {
  const { notes, tags } = useStore();

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: (
              <NotesList
                notes={notesWithTags}
                availableTags={tags}
              />
            ),
            errorElement: <ErrorPage />,
          },
          {
            path: 'new',
            element: <NewNote availableTags={tags} />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/:id',
            element: <NoteLayout notes={notesWithTags} />,
            children: [
              {
                index: true,
                element: <Note />,
              },
              {
                path: 'edit',
                element: <EditNote availableTags={tags} />,
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

  return <RouterProvider router={router} />;
}

export default App;
