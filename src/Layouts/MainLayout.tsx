import { Outlet } from 'react-router-dom';
import { Grid, GridItem, Spacer, IconButton, useColorMode } from '@chakra-ui/react';
import NotesList from '../pages/NotesList';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';

const MainLayout = ({ notes, availableTags }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Grid
      height='100%'
      width='100%'
      minHeight='100dvh'
      maxHeight='100dvh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={2}
    >
      <GridItem
        height='100%'
        maxHeight='100dvh'
        overflowY='auto'
        colSpan={2}
        rowSpan={12}
      >
        <NotesList
          notes={notes}
          availableTags={availableTags}
        />
      </GridItem>
      <GridItem
        height='100%'
        width='100%'
        colSpan={10}
        rowSpan={1}
        display='flex'
        justifyContent='flex-end'
      >
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
        colSpan={10}
        rowSpan={11}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
