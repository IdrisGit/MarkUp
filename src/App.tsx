import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/index';
import { useStore } from '@store/store';
import { useDatabase } from '@db/hooks';

function App() {
  const db = useDatabase();
  const { setNotes, setTags } = useStore();
  useEffect(() => {
    if (db) {
      const getData = async () => {
        const noteList = (await db.notes.find().exec()).map((note) => note.toJSON());
        const tagList = (await db.tags.find().exec()).map((tag) => tag.toJSON());
        setNotes(noteList);
        setTags(tagList);
      };
      getData();
    }
  }, [db, setNotes, setTags]);
  return <RouterProvider router={router} />;
}

export default App;
