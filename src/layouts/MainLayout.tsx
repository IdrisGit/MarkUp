import React, { useState, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Grid, GridItem, useBreakpoint } from '@chakra-ui/react';
import { Sidebar } from '@features/Sidebar';
import { Topbar } from '@features/Topbar';
import { useStore } from '@store/store';
import { useDatabase } from '@db/hooks';
import { RawNote, Tag } from '@type/index';
import demoNotes from '@assets/demo/demoNotes.json';
import demoTags from '@assets/demo/demoTags.json';
import { driver, type DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import '@features/Topbar/components/driverjs.css';

const MainLayout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { hash } = useLocation();
  const db = useDatabase();
  const { setNotes, setTags } = useStore();
  const navigate = useNavigate();
  const breakpoint = useBreakpoint({ ssr: false });

  const driverObjForDemo = useMemo(
    () =>
      driver({
        stagePadding: 6,
        stageRadius: 5,
        overlayColor: '#000000AA',
        overlayOpacity: 0.9,
        popoverClass: 'driverjs-theme',
      }),
    [],
  );

  const driverObj = useMemo(
    () =>
      driver({
        showProgress: true,
        stagePadding: 6,
        stageRadius: 5,
        overlayColor: '#000000AA',
        overlayOpacity: 0.9,
        popoverClass: 'driverjs-theme',
      }),
    [],
  );

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

      // * Show highlight to let the user know they can get a tour, when visiting using the demo link.
      driverObjForDemo.highlight({
        element: '#start-tour-button',
        popover: {
          description: 'You can get a brief tour of the app by clicking here.',
          side: 'bottom',
          align: 'end',
        },
      });
    }
  }, [db, hash, setNotes, setTags, driverObjForDemo]);

  const handleStartTour = () => {
    if (driverObjForDemo && driverObjForDemo.isActive()) {
      driverObjForDemo.destroy();
    }

    const baseSteps: DriveStep[] = [
      {
        element: '#note-list-search-filter',
        popover: {
          title: 'Notes Search',
          description: 'You can search and filter through your notes by title and/or tags.',
          onPrevClick: () => {
            setIsNavOpen(false);
            driverObj.movePrevious();
          },
        },
      },
      {
        element: '#add-edit-tags-button',
        popover: { title: 'Edit Tags', description: 'You can add/edit your tags.' },
      },
      {
        element: '#note-card',
        popover: {
          title: 'Note Card',
          description:
            'Note details are shown here and you can navigate to the note by clicking on the card.',
        },
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
        popover: {
          title: 'Create New Note',
          description: 'Click here to open a new blank note.',
          onNextClick: () => {
            navigate('new');
            setIsNavOpen(false);
            // * setTimeout to allow new note to open before showing the popover.
            setTimeout(() => {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: '#note-form-title',
        popover: {
          title: 'Note Title',
          description: 'You can enter title of your note here.',
          onPrevClick: () => {
            setIsNavOpen(true);
            driverObj.movePrevious();
          },
        },
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
          side: 'top',
          align: 'end',
        },
      },
      {
        element: '#note-form-cancel',
        popover: {
          title: 'Cancel',
          description: 'If you want to cancel the note.',
          side: 'top',
          align: 'end',
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
          side: 'bottom',
          align: 'end',
        },
      },
      {
        popover: {
          title: 'MarkUp',
          description: 'You can play around the app and happy note taking :) .',
        },
      },
    ];

    // * Tour for mobile devices.
    if (breakpoint === ('base' || 'sm')) {
      const mobileDrawerStep: DriveStep = {
        element: '#mobile-open-sidebar-button',
        popover: {
          title: 'Sidebar Toggle',
          description: 'Click here to open sidebar for navigation.',
          onNextClick: () => {
            setIsNavOpen(true);
            // * setTimeout to allow sidebar to open before showing the popover.
            setTimeout(() => {
              driverObj.moveNext();
            }, 100);
          },
        },
      };

      driverObj.setSteps([mobileDrawerStep, ...baseSteps]);
    } else {
      // * Tour for devices larger than mobile.
      driverObj.setSteps(baseSteps);
    }

    driverObj.drive();
  };

  const handleSidebarOpen = () => {
    setIsNavOpen(true);
    // * If user clicks on the sidebar toggle move to next step.
    if (
      driverObj.isActive() &&
      driverObj.getState().activeStep?.element === '#mobile-open-sidebar-button'
    ) {
      // * setTimeout to allow sidebar to open before showing the popover.
      setTimeout(() => {
        driverObj.moveNext();
      }, 100);
    }
  };

  const handleSidebarClose = () => {
    setIsNavOpen(false);
    // * If user clicks on the create new note move to next step.
    if (
      driverObj.isActive() &&
      driverObj.getState().activeStep?.element === '#create-new-note-button'
    ) {
      // * setTimeout to allow sidebar to close before showing the popover.
      setTimeout(() => {
        driverObj.moveNext();
      }, 100);
    }
  };

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
        handleSidebarClose={handleSidebarClose}
      />
      <GridItem
        height='48px'
        width='100%'
        colSpan={{ base: 12, sm: 10 }}
        rowSpan={1}
        display='flex'
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        alignItems='center'
        py={2}
        px={4}
      >
        <Topbar
          handleStartTour={handleStartTour}
          handleSidebarOpen={handleSidebarOpen}
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
