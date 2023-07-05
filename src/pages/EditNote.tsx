import NoteForm from '../components/NoteForm';
import { useNote } from '../hooks/useNote';
import { NoteData, Tag } from '../types';

interface EditNoteProps {
  onSubmit: (id: string, data: NoteData) => string;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

const EditNote: React.FC<EditNoteProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  const note = useNote();

  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        availableTags={availableTags}
        onAddTag={onAddTag}
        onSubmit={(data) => onSubmit(note.id, data)}
      />
    </>
  );
};

export default EditNote;
