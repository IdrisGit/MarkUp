import NoteForm from '@components/NoteForm';
import { useStore } from '@store/store';

export const NewNote: React.FC = () => {
  const { onCreateNote, addTag, tags } = useStore();
  return (
    <NoteForm
      onSubmit={onCreateNote}
      onAddTag={addTag}
      availableTags={tags}
    />
  );
};
