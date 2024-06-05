import { FormEvent, useRef, useState } from 'react';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Textarea,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { NoteData, Tag } from '@type/index';
import { useDatabase } from '@db/hooks';

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

  const db = useDatabase();
  const selectOptionHoverBackgroundColor = useColorModeValue('#9394A5', '#5CAF74');
  const inputBackgroundColor = useColorModeValue('#FAFAFA', '#092635');
  const inputBorderColor = useColorModeValue('#CBD5E0', '#0000007A');
  const inputColor = useColorModeValue('#1A202C', '#FFFFFFEB');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: seletectedTags,
    });
  };

  const handleAddNewTag = async (label: string) => {
    const id = uuidv4();
    const newTag = { id, label };
    onAddTag(newTag);
    setSelectedTags((prev) => [...prev, newTag]);
    if (db) {
      await db.tags.insert({ label, id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ height: '100%' }}
    >
      <Flex
        direction='column'
        maxWidth={{ base: '90%', md: '80%' }}
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
                autoComplete='off'
                color={inputColor}
                borderColor={inputBorderColor}
                _placeholder={{
                  color: inputColor,
                  opacity: 0.85,
                }}
                required
              />
            </FormControl>
          </Box>
          <Box width={{ base: '100%', md: '50%' }}>
            <CreatableReactSelect
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
                  backgroundColor: state.isFocused ? selectOptionHoverBackgroundColor : undefined,
                }),
              }}
              onCreateOption={handleAddNewTag}
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
          <Button
            type='submit'
            colorScheme='green'
          >
            Save
          </Button>
          <Link to={'..'}>
            <Button
              type='button'
              variant='outline'
              colorScheme='red'
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
