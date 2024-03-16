import { Outlet } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import NotesList from '../pages/NotesList';

const MainLayout = ({ notes, availableTags }) => {
  // const { theme } = useTheme();

  return (
    <Grid
      height='100%'
      width='100%'
      minHeight='100dvh'
      maxHeight='100dvh'
      templateColumns='repeat(12, 1fr)'
      gap={2}
    >
      <GridItem
        height='100%'
        maxHeight='100dvh'
        overflowY='auto'
        colSpan={2}
      >
        <NotesList
          notes={notes}
          availableTags={availableTags}
        />
      </GridItem>
      <GridItem
        height='100%'
        maxHeight='100dvh'
        overflowY='auto'
        colSpan={10}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
