import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { Sidebar } from '@features/Sidebar';
import { Topbar } from '@features/Topbar';
import { useStore } from '@store/store';
import { useDatabase } from '@db/hooks';
import { RawNote, Tag } from '@type/index';
import demoNotes from '@assets/demo/demoNotes.json';
import demoTags from '@assets/demo/demoTags.json';

const MainLayout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { hash } = useLocation();
  const db = useDatabase();
  const { setNotes, setTags } = useStore();

  useEffect(() => {
    if (hash && hash === '#demo' && db) {
      const insertDemoData = async () => {
        const notesCount = await db.notes.count().exec();
        const tagsCount = await db.tags.count().exec();

        if (notesCount || tagsCount) {
          // ? Check if notes or tags are present in the database and return without setting demo notes
          return;
        }

        const demoNoteList: Array<RawNote> = JSON.parse(JSON.stringify(demoNotes));
        const demoTagList: Array<Tag> = JSON.parse(JSON.stringify(demoTags));

        await db.notes.bulkInsert(demoNoteList.map((note) => note));
        await db.tags.bulkInsert(demoTagList.map((tag) => tag));

        // * Optimistic Update
        setNotes(demoNoteList);
        setTags(demoTagList);
      };
      insertDemoData();
    }
  }, [db, hash, setNotes, setTags]);

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
