import { FormEvent, useRef, useState } from 'react';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { Button as BSButton, Col, Form, Row, Stack } from 'react-bootstrap';
import { NoteData, Tag } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { Flex, Container, Box, FormControl, Input, Textarea, Button } from '@chakra-ui/react';

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
    <form
      onSubmit={handleSubmit}
      style={{ height: '100%' }}
    >
      <Flex
        direction='column'
        width='80%'
        margin='auto'
        height='100%'
        paddingY='16px'
        gap='5'
      >
        <Box
          display='flex'
          flexDirection='column'
          gap='2'
        >
          <Box>
            <FormControl>
              <Input
                ref={titleRef}
                type='text'
                defaultValue={title}
                placeholder='Title'
                required
              />
            </FormControl>
          </Box>
          <Box width='25%'>
            <CreatableReactSelect
              placeholder='Select Tags'
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
          </Box>
        </Box>
        <Box height='100%'>
          <Textarea
            required
            variant='outline'
            ref={markdownRef}
            defaultValue={markdown}
            height='100%'
            resize='none'
          />
        </Box>
        <Box
          display='flex'
          gap={2}
          justifyContent='flex-end'
        >
          <Button type='submit'>Save</Button>
          <Link to={'..'}>
            <Button
              type='button'
              variant='outline'
            >
              Cancel
            </Button>
          </Link>
        </Box>
      </Flex>
    </form>
  );
};

export default NoteForm;
