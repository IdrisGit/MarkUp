import React, { Dispatch, SetStateAction } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';

interface TopbarProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Topbar: React.FC<TopbarProps> = ({ setIsNavOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        aria-label='Change Theme'
        variant='outline'
        size='sm'
        fontSize='16px'
        display={{ base: 'inherit', md: 'none' }}
        onClick={() => setIsNavOpen(true)}
        icon={<RxHamburgerMenu />}
      />
      <IconButton
        aria-label='Change Theme'
        variant='flushed'
        size='xs'
        fontSize='16px'
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MdDarkMode /> : <CiLight />}
      />
    </>
  );
};
