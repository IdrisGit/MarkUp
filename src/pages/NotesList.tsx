import React, { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../types';
import { useStore } from '../store/store';
import {
  Container,
  VStack,
  HStack,
  Box,
  Flex,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Card,
  CardBody,
  Badge,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

interface NotesListProp {
  notes: SimplifiedNote[];
  availableTags: Tag[];
}

interface EditTagsModalProps {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  onUpdate: (id: string, label: string) => void;
  onDelete: (id: string) => void;
  onAdd: (tag: Tag) => void;
}

const NoteCard: React.FC<SimplifiedNote> = ({ id, title, tags }) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      variant='outline'
    >
      <CardBody>
        <VStack gap={2}>
          <Text>{title}</Text>
          <HStack
            gap={1}
            flexWrap='wrap'
          >
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant='outline'
              >
                {tag.label}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const EditTagsModal: React.FC<EditTagsModalProps> = ({
  show,
  availableTags,
  handleClose,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const newTagRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (newTagRef.current?.value.trim().length) {
      onAdd({
        label: newTagRef.current.value.trim(),
        id: uuidv4(),
      });

      newTagRef.current.value = '';
    }
  };

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Tags</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <List
              spacing='2'
              padding='0'
            >
              {availableTags.map((tag) => (
                <ListItem key={tag.id}>
                  <InputGroup>
                    <Input
                      type='text'
                      value={tag.label}
                      onChange={(e) => onUpdate(tag.id, e.target.value)}
                    />
                    <InputRightElement>
                      <Button
                        variant='filled'
                        onClick={() => onDelete(tag.id)}
                      >
                        &times;
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </ListItem>
              ))}
            </List>
          </form>
          <form>
            <Flex gap='2'>
              <Input
                ref={newTagRef}
                type='text'
                defaultValue=''
                required
              />
              <Button
                variant='outline'
                onClick={handleAddTag}
              >
                Add Tag
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const NotesList: React.FC<NotesListProp> = ({ notes, availableTags }) => {
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [editTagsModalOpen, setEditTagsModalOpen] = useState<boolean>(false);

  const { addTag, onUpdateTag, onDeleteTag } = useStore();

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [notes, title, selectedTags]);

  return (
    <VStack
      width='100%'
      height='100%'
      paddingY='16px'
      paddingX='12px'
    >
      <Container>
        <form>
          <Flex
            direction='column'
            rowGap='2'
          >
            <Box>
              <FormControl>
                <Input
                  type='text'
                  value={title}
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <ReactSelect
                  placeholder='Select Tags'
                  value={selectedTags.map((tag) => {
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
              </FormControl>
            </Box>
          </Flex>
        </form>
      </Container>
      <Container>
        <List
          width='100%'
          padding='0'
          spacing='2'
        >
          {filteredNotes.map((note) => (
            <ListItem
              key={note.id}
              width='100%'
            >
              <NoteCard
                title={note.title}
                id={note.id}
                tags={note.tags}
              />
            </ListItem>
          ))}
          <ListItem>
            <Link to={'/new'}>
              <Button
                variant='solid'
                width='100%'
              >
                Create New Note
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Button
              variant='outline'
              width='100%'
              onClick={() => setEditTagsModalOpen(true)}
            >
              Edit Tags
            </Button>
          </ListItem>
        </List>
      </Container>
      {editTagsModalOpen && (
        <EditTagsModal
          show={editTagsModalOpen}
          handleClose={() => setEditTagsModalOpen(false)}
          availableTags={availableTags}
          onAdd={addTag}
          onUpdate={onUpdateTag}
          onDelete={onDeleteTag}
        />
      )}
    </VStack>
  );
};

export default NotesList;
