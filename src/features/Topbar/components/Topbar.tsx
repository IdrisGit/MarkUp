import React from 'react';
import { Button, IconButton, useColorMode, HStack } from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaGithub } from 'react-icons/fa';
import 'driver.js/dist/driver.css';
import '@features/Topbar/components/driverjs.css';

interface TopbarProps {
  handleStartTour: () => void;
  handleSidebarOpen: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ handleSidebarOpen, handleStartTour }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton
        id='mobile-open-sidebar-button'
        aria-label='Open Sidebar'
        variant='outline'
        size='sm'
        fontSize='16px'
        display={{ base: 'inherit', md: 'none' }}
        onClick={handleSidebarOpen}
        icon={<RxHamburgerMenu />}
      />
      <HStack spacing={3}>
        <Button
          variant='outline'
          size='sm'
          fontSize='sm'
          onClick={handleStartTour}
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
