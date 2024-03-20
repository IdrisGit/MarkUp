import NoteForm from '../components/NoteForm';
import { Tag } from '../types';
import { useStore } from '../store/store';

interface NewNoteProps {
  availableTags: Tag[];
}

const NewNote: React.FC<NewNoteProps> = ({ availableTags }) => {
  const { onCreateNote, addTag } = useStore();
  return (
    <NoteForm
      onSubmit={onCreateNote}
      onAddTag={addTag}
      availableTags={availableTags}
    />
  );
};

export default NewNote;
