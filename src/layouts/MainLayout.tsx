import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { Sidebar } from '@features/Sidebar';
import { Topbar } from '@features/Topbar';

const MainLayout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
      <Sidebar
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
      />
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
        <Topbar setIsNavOpen={setIsNavOpen} />
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
