import NoteForm from '@components/NoteForm';
import { useStore } from '@store/store';
import { useNote } from '@hooks/useNote';

export const EditNote: React.FC = () => {
  const { onUpdateNote, addTag, tags } = useStore();
  const note = useNote();

  return (
    <NoteForm
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
      availableTags={tags}
      onAddTag={addTag}
      onSubmit={(data) => onUpdateNote(note.id, data)}
    />
  );
};
