import { Link, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNote } from "../hooks/useNote";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";

interface NoteProps {
    onDelete: (id: string) => void
}

const Note: React.FC<NoteProps> = ({onDelete}) => {

    const note = useNote();
    const navigate = useNavigate();

    return(
        <>
        <Stack className="h-100">
        <Row className="align-items-center mb-4">
            <Col>
                <h1>{note.title}</h1>
                <Stack gap={1} direction="horizontal" className="flex-wrap">
                    {note.tags.map(tag => (
                        <Badge key={tag.id} className="text-truncate">
                            {tag.label}
                        </Badge>
                    ))}
                </Stack>
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction="horizontal">
                    <Link to={`/${note.id}/edit`}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                        variant="outline-danger"
                        onClick={() => {
                            onDelete(note.id)
                            navigate('/', {replace: true})
                        }}
                    >
                        Delete
                    </Button>
                    <Link to='..'>
                        <Button variant="outline-secondary">Back</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <Row className="border border-dark rounded p-2 mh-100 h-100" style={{minHeight: "85vh"}}>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </Row>
        </Stack>
        </>
    )
};

export default Note;