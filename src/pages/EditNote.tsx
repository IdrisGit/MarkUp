import NoteForm from '../components/NoteForm';
import { useStore } from '../store/store';
import { useNote } from '../hooks/useNote';
import { Tag } from '../types';

interface EditNoteProps {
  availableTags: Tag[];
}

const EditNote: React.FC<EditNoteProps> = ({ availableTags }) => {
  const { onUpdateNote, addTag } = useStore();
  const note = useNote();

  return (
    <NoteForm
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
      availableTags={availableTags}
      onAddTag={addTag}
      onSubmit={(data) => onUpdateNote(note.id, data)}
    />
  );
};

export default EditNote;
