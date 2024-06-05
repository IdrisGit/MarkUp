import NoteForm from '@components/NoteForm';
import { NoteData } from '@type/index';
import { useStore } from '@store/store';
import { useDatabase } from '@db/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export const NewNote: React.FC = () => {
  const { onCreateNote, addTag, tags } = useStore();
  const navigate = useNavigate();
  const db = useDatabase();

  const createNewNote = async ({ title, markdown, tags }: NoteData) => {
    const id = uuidv4();
    const noteId = onCreateNote({ title, markdown, tags, id });
    navigate(`/${noteId}`);
    if (db) {
      const tagIds = tags.map((tag) => tag.id);
      await db.notes.insert({ id, title, markdown, tagIds });
    }
  };

  return (
    <NoteForm
      onSubmit={createNewNote}
      onAddTag={addTag}
      availableTags={tags}
    />
  );
};
