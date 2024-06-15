import React, { Dispatch, SetStateAction } from 'react';
import { IconButton, useColorMode, HStack } from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaGithub } from 'react-icons/fa';

interface TopbarProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Topbar: React.FC<TopbarProps> = ({ setIsNavOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <IconButton
          as='a'
          href='https://github.com/IdrisGit/MarkUp'
          target='_blank'
          rel='noopener'
          aria-label='Change Theme'
          variant='flushed'
          size='xs'
          fontSize='16px'
          icon={<FaGithub />}
        />
        <IconButton
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
