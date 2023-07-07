import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useNote } from '../hooks/useNote';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { useStore } from '../store/store';
import DeleteModal from '../components/DeleteModal';
import remarkGfm from 'remark-gfm';

const Note: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { onDeleteNote } = useStore();
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Stack className='h-100'>
        <Row className='align-items-center mb-4'>
          <Col>
            <h1 className='text-break'>{note.title}</h1>
            <Stack
              gap={1}
              direction='horizontal'
              className='flex-wrap'
            >
              {note.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  className='text-truncate'
                >
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          </Col>
          <Col xs='auto'>
            <Stack
              gap={2}
              direction='horizontal'
            >
              <Link to={`/${note.id}/edit`}>
                <Button variant='primary'>Edit</Button>
              </Link>
              <Button
                variant='outline-danger'
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
              <Link to='..'>
                <Button variant='outline-secondary'>Back</Button>
              </Link>
            </Stack>
          </Col>
        </Row>
        <Row
          className='border border-dark rounded py-2 px-4 mh-100 h-100'
          style={{ minHeight: '85vh' }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.markdown}
          </ReactMarkdown>
        </Row>
      </Stack>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => {
          onDeleteNote(note.id);
          navigate('/', { replace: true });
        }}
      />
    </>
  );
};

export default Note;
