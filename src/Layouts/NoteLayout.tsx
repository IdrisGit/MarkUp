import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";


interface NoteLayoutProps {
    notes: Note[]
}

const NoteLayout: React.FC<NoteLayoutProps> = ({notes}) => {

    const { id } = useParams();

    const note = notes.find(note => note.id === id)

    if(note === null) return <Navigate to='/' replace />

    return <Outlet context={note} />
};

export default NoteLayout;