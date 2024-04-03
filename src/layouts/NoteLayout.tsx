import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useNotesWithTags } from '@hooks/useNotesWithTags';

const NoteLayout: React.FC = () => {
  const { id } = useParams();
  const { notes } = useNotesWithTags();

  const note = notes.find((note) => note.id === id);

  if (note === undefined)
    return (
      <Navigate
        to='/'
        replace
      />
    );

  return <Outlet context={note} />;
};

export default NoteLayout;
