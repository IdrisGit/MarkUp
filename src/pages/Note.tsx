import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useNote } from '../hooks/useNote';
import { useStore } from '../store/store';
import DeleteModal from '../components/DeleteModal';
import remarkGfm from 'remark-gfm';
import { Flex, Box, Badge, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

const Note: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { onDeleteNote } = useStore();
  const note = useNote();
  const navigate = useNavigate();
  const iconBorderColor = useColorModeValue('#484b6a', '#9EC8B9');

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
              >
                {tag.label}
              </Badge>
            ))}
          </Flex>
        </Box>
        <Box
          display='flex'
          gap='2'
        >
          <IconButton
            variant='outline'
            aria-label='Edit Note'
            onClick={() => navigate(`/${note.id}/edit`)}
            borderColor={iconBorderColor}
            icon={<MdEdit />}
          />
          <IconButton
            variant='outline'
            aria-label='Edit Note'
            borderColor='red.400'
            onClick={() => setShowDeleteModal(true)}
            icon={<IoMdTrash />}
          />
        </Box>
      </Box>
      <Box flex='1'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.markdown}</ReactMarkdown>
      </Box>
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={() => onDeleteNote(note.id)}
        />
      )}
    </Flex>
  );
};

export default Note;
