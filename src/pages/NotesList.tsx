import React, { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag, SimplifiedNote } from '../types';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { LuClipboardEdit } from 'react-icons/lu';

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

const NoteCard: React.FC<SimplifiedNote> = ({ id, title, tags, selectedId }) => {
  const cardBackgroundColor = useColorModeValue('#d2d3db', '#5C8374');
  const cardHoverBackgroundColor = useColorModeValue('#9394a5', '#5CAF74');
  return (
    <Card
      as={Link}
      to={`/${id}`}
      variant='outline'
      bgColor={selectedId === id ? cardHoverBackgroundColor : cardBackgroundColor}
      _hover={{
        backgroundColor: cardHoverBackgroundColor,
      }}
    >
      <CardBody p='4'>
        <VStack
          gap={2}
          alignItems='flex-start'
        >
          <Text fontSize='sm'>{title}</Text>
          <HStack
            gap={1}
            flexWrap='wrap'
          >
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant='outline'
                fontSize='0.6em'
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
  const addBorderColor = useColorModeValue('#484B6A55', '#9EC8B955');
  const addHoverBorderColor = useColorModeValue('#484B6A', '#9EC8B9');

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
      isCentered
    >
      <ModalOverlay />
      <ModalContent margin={{ base: 4, md: 0 }}>
        <ModalHeader>Edit Tags</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
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
            <Flex
              gap='2'
              mt={4}
            >
              <Input
                ref={newTagRef}
                type='text'
                defaultValue=''
                required
              />
              <Button
                variant='outline'
                onClick={handleAddTag}
                borderColor={addBorderColor}
                _hover={{
                  borderColor: addHoverBorderColor,
                }}
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
  const { id } = useParams();
  const buttonBackgroundColor = useColorModeValue('#D2D3DB', '#5C8374');
  const buttonHoverBackgroundColor = useColorModeValue('#9394A5', '#5CAF74');
  const inputBackgroundColor = useColorModeValue('#FAFAFA', '#092635');
  const inputBorderColor = useColorModeValue('#CBD5E0', '#0000007A');
  const inputColor = useColorModeValue('#1A202C', '#FFFFFFEB');

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
      <Container padding='0'>
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
                  placeholder='Search Title'
                  color={inputColor}
                  bgColor={inputBackgroundColor}
                  borderColor={inputBorderColor}
                  _placeholder={{
                    color: inputColor,
                    opacity: 0.85,
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <ReactSelect
                  placeholder='Select Tags'
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      color: inputColor,
                      backgroundColor: inputBackgroundColor,
                      borderColor: inputBorderColor,
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      color: inputColor,
                      opacity: 0.85,
                    }),
                    menuList: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: inputBackgroundColor,
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      color: inputColor,
                      backgroundColor: state.isFocused ? buttonHoverBackgroundColor : undefined,
                    }),
                  }}
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
      <Container padding='0'>
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
                selectedId={id ? id.toString() : ''}
              />
            </ListItem>
          ))}
          <ListItem>
            <Link to={'/new'}>
              <Button
                variant='solid'
                width='100%'
                fontSize='sm'
                bgColor={buttonBackgroundColor}
                _hover={{
                  backgroundColor: buttonHoverBackgroundColor,
                }}
                rightIcon={<MdAdd />}
              >
                Create New Note
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Button
              variant='solid'
              width='100%'
              fontSize='sm'
              bgColor={buttonBackgroundColor}
              _hover={{
                backgroundColor: buttonHoverBackgroundColor,
              }}
              rightIcon={<LuClipboardEdit />}
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
