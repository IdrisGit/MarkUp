import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/index';
import { useStore } from '@store/store';
import { useDatabase } from '@db/hooks';

/**
 * * The RxDB queries don't throw error instead it returns error object in the result, since all data is local only for now, not using try/catch is not a problem as it will not really throw anything for catch block.
 *  TODO: Need to update that if I decide to use a remote database.
 */

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
