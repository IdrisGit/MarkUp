import NoteForm from '@components/NoteForm';
import { NoteData } from '@type/index';
import { useStore } from '@store/store';
import { useNote } from '@hooks/useNote';
import { useDatabase } from '@db/hooks';
import { useNavigate } from 'react-router-dom';

export const EditNote: React.FC = () => {
  const { onUpdateNote, addTag, tags } = useStore();
  const navigate = useNavigate();
  const db = useDatabase();
  const note = useNote();

  const updateNote = async ({ title, markdown, tags }: NoteData) => {
    const noteId = onUpdateNote(note.id, { title, markdown, tags });
    navigate(`/${noteId}`);
    if (db) {
      const tagIds = tags.map((tag) => tag.id);
      await db.notes.upsert({ id: note.id, title, markdown, tagIds });
    }
  };

  return (
    <NoteForm
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
      availableTags={tags}
      onAddTag={addTag}
      onSubmit={updateNote}
    />
  );
};
