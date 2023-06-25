import { FormEvent, useRef, useState } from 'react';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { NoteData, Tag } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  title?: string;
  markdown?: string;
  tags?: Tag[];
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  markdown = '',
  tags = [],
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [seletectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [markdownPreview, setMarkdownPreview] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: seletectedTags,
    });

    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                type='text'
                defaultValue={title}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label: label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={seletectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    }),
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Row>
            <Col
              xs={12}
              md={6}
            >
              <Form.Label>Body</Form.Label>
              <Form.Control
                required
                as='textarea'
                ref={markdownRef}
                defaultValue={markdown}
                onChange={(e) => setMarkdownPreview(e.target.value)}
                rows={25}
                style={{ resize: 'none' }}
              />
            </Col>
            <Col
              xs={6}
              className='d-none d-md-block'
            >
              <Form.Label>Preview</Form.Label>
              <div
                className='border rounded'
                style={{ height: '95%', padding: '10px 10px 0px' }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdownPreview}
                </ReactMarkdown>
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Stack
          gap={2}
          direction='horizontal'
          className='justify-content-end'
        >
          <Button type='submit'>Save</Button>
          <Link to={'..'}>
            <Button
              type='button'
              variant='outline-secondary'
            >
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
