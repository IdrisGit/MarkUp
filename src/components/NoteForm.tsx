import { FormEvent, useRef, useState } from 'react';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { NoteData, Tag } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

interface NoteFormProps {
  onSubmit: (data: NoteData) => string;
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
  const [markdownPreview, setMarkdownPreview] = useState(markdown);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const noteId = onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: seletectedTags,
    });

    navigate(`/${noteId}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col
              xs={12}
              md={6}
            >
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
            <Col
              xs={12}
              md={6}
            >
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
            <Row className='mb-1'>
              <Col xs={2}>
                <Button
                  variant={`${previewOpen ? 'secondary' : 'outline-secondary'}`}
                  className='d-flex align-items-center px-2 w-auto'
                  onClick={() => setPreviewOpen((prev) => !prev)}
                >
                  {previewOpen ? <BiSolidHide /> : <BiSolidShow />}{' '}
                  <span className='ms-1'>Preview</span>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {previewOpen ? (
                  <>
                    <Form.Label className='fs-2 fw-semibold'>Preview</Form.Label>
                    <div
                      className='border rounded'
                      style={{
                        // overflow: 'auto',
                        // height: '38.3em',
                        // maxHeight: '38.3em',
                        padding: '5px 10px',
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownPreview}</ReactMarkdown>
                    </div>
                  </>
                ) : (
                  <>
                    <Form.Label className='fs-2 fw-semibold'>Body</Form.Label>
                    <Form.Control
                      required
                      as='textarea'
                      ref={markdownRef}
                      defaultValue={markdown}
                      onChange={(e) => setMarkdownPreview(e.target.value)}
                      rows={22}
                      style={{ resize: 'none' }}
                    />
                  </>
                )}
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
    </>
  );
};

export default NoteForm;
