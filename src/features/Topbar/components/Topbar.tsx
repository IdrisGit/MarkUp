import React, { Dispatch, SetStateAction } from 'react';
import { Button, IconButton, useColorMode, HStack } from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaGithub } from 'react-icons/fa';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface TopbarProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Topbar: React.FC<TopbarProps> = ({ setIsNavOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const driverObj = driver({
    showProgress: true,
    stagePadding: 6,
    stageRadius: 5,
    steps: [
      {
        element: '#note-list-search-filter',
        popover: {
          title: 'Notes Search',
          description: 'You can search and filter through your notes by title and/or tags.',
        },
      },
      {
        element: '#add-edit-tags-button',
        popover: { title: 'Edit Tags', description: 'You can add/edit your tags.' },
      },
      {
        element: '#note-card',
        popover: { title: 'Note Card', description: 'Notes details.' },
      },
      {
        element: '#note-title',
        popover: { title: 'Note Title', description: 'Title of your note.' },
      },
      {
        element: '#note-tag-list',
        popover: { title: 'Tags', description: 'All the tags currently attached to your note.' },
      },
      {
        element: '#create-new-note-button',
        popover: { title: 'Create New Note', description: 'Click here to open a new blank note.' },
      },
      {
        element: '#note-form-title',
        popover: { title: 'Note Title', description: 'You can enter title of your note here.' },
      },
      {
        element: '#note-form-tag-select',
        popover: {
          title: 'Create New Note',
          description:
            'You can select all the tags you want to attach to your note. You can also create new tags.',
        },
      },
      {
        element: '#note-markdown',
        popover: {
          title: 'Note Body',
          description: 'You can note down all that you desire here. (Markdown Supported)',
        },
      },
      {
        element: '#note-form-save',
        popover: {
          title: 'Save Note',
        },
      },
      {
        element: '#note-form-cancel',
        popover: {
          title: 'Cancel',
          description: 'If you want to cancel the note.',
        },
      },
      {
        element: '#theme-switch-button',
        popover: {
          title: 'Theme Switch',
          description: 'You can switch between Light and Dark mode. (Default: System Preference)',
        },
      },
      {
        element: '#github-link',
        popover: {
          title: 'GitHub Link',
          description:
            'You can checkout the GitHub repo by clicking here. If you like the project you can also star &#11088; it there.',
        },
      },
      {
        popover: {
          title: 'MarkUp',
          description: 'You can play around the app and happy note taking :) .',
        },
      },
    ],
  });

  return (
    <>
      <IconButton
        aria-label='Open Sidebar'
        variant='outline'
        size='sm'
        fontSize='16px'
        display={{ base: 'inherit', md: 'none' }}
        onClick={() => setIsNavOpen(true)}
        icon={<RxHamburgerMenu />}
      />
      <HStack spacing={3}>
        <Button
          variant='outline'
          size='sm'
          fontSize='sm'
          onClick={() => driverObj.drive()}
        >
          Start Tour
        </Button>
        <IconButton
          id='github-link'
          as='a'
          href='https://github.com/IdrisGit/MarkUp'
          target='_blank'
          rel='noopener'
          aria-label='Redirect to apps repo on github'
          variant='flushed'
          size='xs'
          fontSize='16px'
          icon={<FaGithub />}
        />
        <IconButton
          id='theme-switch-button'
          aria-label='Change Theme'
          variant='flushed'
          size='xs'
          fontSize='16px'
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MdDarkMode /> : <CiLight />}
        />
      </HStack>
    </>
  );
};
