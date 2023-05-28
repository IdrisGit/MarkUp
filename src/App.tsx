import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import NotesList from './pages/NotesList';
import NewNote from "./pages/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types";
import { useMemo } from "react";

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])


  const onCreateNote = ({tags, ...data}: NoteData) => {
    setNotes(prevNotes => [ ...prevNotes, {...data, id: uuidv4(), tagIds: tags.map(tag => tag.id)}])
  }

  const addTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag])
  }

  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return {...tag, label}
        } else {
          return tag
        }
      })
    })
  }

  const onDeleteTag = (id: string) => {
    setTags((prev) => prev.filter(tag => tag.id !== id))
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NotesList notes={notesWithTags} availableTags={tags} updateTag={onUpdateTag} deleteTag={onDeleteTag}  addTag={addTag} />
    },
    {
      path: '/new',
      element: <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
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
