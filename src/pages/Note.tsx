import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useNote } from '../hooks/useNote';
import { useStore } from '../store/store';
import DeleteModal from '../components/DeleteModal';
import remarkGfm from 'remark-gfm';
import { Flex, Box, Badge, Heading, IconButton } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

const Note: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { onDeleteNote } = useStore();
  const note = useNote();
  const navigate = useNavigate();

  return (
    <Flex
      direction='column'
      margin='auto'
      maxWidth='80%'
    >
      <Box
        paddingY='16px'
        display='flex'
        width='100%'
        justifyContent='space-between'
      >
        <Box
          display='flex'
          flexDirection='column'
        >
          <Heading as='h1'>{note.title}</Heading>
          <Flex gap={2}>
            {note.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant='outline'
                className='text-truncate'
              >
                {tag.label}
              </Badge>
            ))}
          </Flex>
        </Box>
        <Box>
          <IconButton
            variant='outline'
            aria-label='Edit Note'
            onClick={() => navigate(`/${note.id}/edit`)}
            icon={<MdEdit />}
          />
        </Box>
      </Box>
      <Box flex='1'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.markdown}</ReactMarkdown>
      </Box>
    </Flex>
  );
};

export default Note;
