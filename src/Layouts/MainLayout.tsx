import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Grid,
  GridItem,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorMode,
  useColorModeValue,
  useBreakpoint,
} from '@chakra-ui/react';
import NotesList from '../pages/NotesList';
import { SimplifiedNote, Tag } from '../types';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';

interface MainLayoutProp {
  notes: SimplifiedNote[];
  availableTags: Tag[];
}

const MainLayout: React.FC<MainLayoutProp> = ({ notes, availableTags }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const sidebarBackgroundColor = useColorModeValue('#E4E5F1', '#1B4242');
  const breakpoint = useBreakpoint({ ssr: false });

  return (
    <Grid
      height='100%'
      width='100%'
      minHeight='100dvh'
      maxHeight='100dvh'
      templateRows='repeat(24, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={2}
    >
      {breakpoint === ('base' || 'sm') ? (
        <Drawer
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          placement='left'
        >
          <DrawerOverlay />
          <DrawerContent bgColor={sidebarBackgroundColor}>
            <DrawerBody p={0}>
              <NotesList
                notes={notes}
                availableTags={availableTags}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <GridItem
          height='100%'
          maxHeight='100dvh'
          overflowY='auto'
          colSpan={2}
          rowSpan={24}
          bgColor={sidebarBackgroundColor}
        >
          <NotesList
            notes={notes}
            availableTags={availableTags}
          />
        </GridItem>
      )}
      <GridItem
        height='100%'
        width='100%'
        colSpan={{ base: 12, sm: 10 }}
        rowSpan={1}
        display='flex'
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        alignItems='center'
        pt={2}
        px={4}
      >
        <IconButton
          aria-label='Change Theme'
          variant='outline'
          size='md'
          display={{ base: 'inherit', md: 'none' }}
          onClick={() => setIsNavOpen(true)}
          icon={<RxHamburgerMenu />}
        />
        <IconButton
          aria-label='Change Theme'
          variant='flushed'
          size='lg'
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MdDarkMode /> : <CiLight />}
        />
      </GridItem>
      <GridItem
        height='100%'
        maxHeight='100dvh'
        overflowY='auto'
        colSpan={{ base: 12, sm: 10 }}
        rowSpan={23}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
