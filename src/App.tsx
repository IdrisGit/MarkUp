import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types";
import { useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import NotesList from './pages/NotesList';
import NewNote from "./pages/NewNote";
import NoteLayout from "./Layouts/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

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

  const onUpdateNote = (id: string, {tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id){
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
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
      element: <NoteLayout notes={notesWithTags} />,
      children: [
        {
          index: true,
          element: <Note onDelete={onDeleteNote} />
        },
        {
          path: 'edit',
          element: <EditNote onAddTag={addTag} availableTags={tags} onSubmit={onUpdateNote} />
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
