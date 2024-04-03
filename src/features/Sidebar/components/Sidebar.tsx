import React, { Dispatch, SetStateAction } from 'react';
import {
  GridItem,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  useBreakpoint,
} from '@chakra-ui/react';
import { NotesList } from './NotesList';
import { useNotesWithTags } from '@hooks/useNotesWithTags';

interface SidebarProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isNavOpen, setIsNavOpen }) => {
  const sidebarBackgroundColor = useColorModeValue('#E4E5F1', '#1B4242');
  const breakpoint = useBreakpoint({ ssr: false });
  const { notes, tags } = useNotesWithTags();
  return (
    <>
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
                availableTags={tags}
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
            availableTags={tags}
          />
        </GridItem>
      )}
    </>
  );
};
