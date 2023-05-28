import React, { useMemo, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import styles from './NotesList.module.css';
import { Button, Col, Row, Stack,  Form, Card, Badge, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select';
import { Tag } from "../types";

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

interface NotesListProp {
    notes: SimplifiedNote[]
    availableTags: Tag[]
    deleteTag: (id: string) => void
    updateTag: (id: string, label: string) => void
    addTag: (tag: Tag) => void
}

interface EditTagsModalProps {
    show: boolean
    availableTags: Tag[]
    handleClose : () => void
    onUpdate: (id: string, label: string) => void
    onDelete: (id: string) => void
    onAdd: (tag: Tag) => void
}

const NoteCard: React.FC<SimplifiedNote> = ({
    id,
    title,
    tags
}) => {
    return(
        <Card
            as={Link}
            to={`/${id}`}
            className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
            <Card.Body>
                <Stack
                    gap={2}
                    className="align-items-center justify-content-center h-100"
                >
                    <span className="fs-5">{title}</span>
                    <Stack
                        gap={1}
                        direction="horizontal"
                        className="justify-content-center flex-wrap"
                    >
                        {tags.map(tag => (
                            <Badge key={tag.id} className="text-truncate">
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )
}

const EditTagsModal: React.FC<EditTagsModalProps> = ({
    show,
    availableTags,
    handleClose,
    onAdd,
    onUpdate,
    onDelete
}) => {

    const newTagRef = useRef<HTMLInputElement>(null);

    const handleAddTag = () => {
        if(newTagRef.current?.value.trim().length){
            onAdd({
                label: newTagRef.current.value.trim(),
                id: uuidv4()
            })

            newTagRef.current.value = ""
        }
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Edit Tags</Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control
                                        type="text" 
                                        value={tag.label}
                                        onChange={(e) => onUpdate(tag.id, e.target.value)}
                                    />
                                </Col>
                                <Col xs='auto'>
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => onDelete(tag.id)}
                                    >
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
                <Form>
                    <Stack direction="horizontal" className="mt-5" gap={2}>
                        <Col>
                            <Form.Control ref={newTagRef} type="text" defaultValue='' required />
                        </Col>
                        <Col xs='auto'>   
                            <Button
                                variant="outline-primary"
                                onClick={handleAddTag}
                            >
                                Add Tag
                            </Button>
                        </Col>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const NotesList: React.FC<NotesListProp> = ({
    notes,
    availableTags,
    addTag,
    updateTag,
    deleteTag
}) => {

    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [editTagsModalOpen, setEditTagsModalOpen] = useState<boolean>(false)

    const filteredNotes = useMemo(() => {
      return notes.filter(note => {
        return (
            (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
            (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        )
      })
    },[notes, title, selectedTags])

    return(
      <>
      <Row className="align-item-center mb-4">
        <Col>
            <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
            <Stack gap={2} direction="horizontal">
                <Link to={"/new"}>
                <Button variant="primary">
                    Create New Note
                </Button>
                </Link>
                <Button variant="outline-secondary" onClick={() => setEditTagsModalOpen(true)}>
                    Edit Tags
                </Button>
            </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type='text' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <ReactSelect
                        value={selectedTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        options={availableTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return {label: tag.label, id: tag.value}
                            }))
                        }}
                        isMulti
                    />
                </Form.Group>
            </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
            <Col key={note.id}>
                <NoteCard title={note.title} id={note.id} tags={note.tags}/>
            </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsModalOpen}
        handleClose={() => setEditTagsModalOpen(false)}
        availableTags={availableTags}
        onAdd={addTag}
        onUpdate={updateTag}
        onDelete={deleteTag}
      />
      </>
    )
};

export default NotesList;