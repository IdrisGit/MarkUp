import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useMemo } from 'react';
import { useStore } from './store/store';
import NotesList from './pages/NotesList';
import NewNote from './pages/NewNote';
import NoteLayout from './Layouts/NoteLayout';
import Note from './pages/Note';
import EditNote from './pages/EditNote';
import ErrorPage from './pages/ErrorPage';

function App() {
  const {
    notes,
    tags,
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
    addTag,
    onUpdateTag,
    onDeleteTag,
  } = useStore();

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
        element: (
          <NotesList
            notes={notesWithTags}
            availableTags={tags}
            updateTag={onUpdateTag}
            deleteTag={onDeleteTag}
            addTag={addTag}
          />
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/new',
        element: (
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/:id',
        element: <NoteLayout notes={notesWithTags} />,
        children: [
          {
            index: true,
            element: <Note onDelete={onDeleteNote} />,
          },
          {
            path: 'edit',
            element: (
              <EditNote
                onAddTag={addTag}
                availableTags={tags}
                onSubmit={onUpdateNote}
              />
            ),
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
