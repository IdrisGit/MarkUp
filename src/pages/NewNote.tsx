import NoteForm from "../components/NoteForm"
import { NoteData, Tag } from "../types"

interface NewNoteProps {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NewNote: React.FC<NewNoteProps> = (props) => {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={props.onSubmit}
                onAddTag={props.onAddTag}
                availableTags={props.availableTags}
            />
        </>
    )
};

export default NewNote;