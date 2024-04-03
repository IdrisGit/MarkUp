import { useMemo } from 'react';
import { useStore } from '@store/store';
import { Note } from '@type/index';

export const useNotesWithTags = () => {
  const { notes, tags } = useStore();

  const notesWithTags: Note[] = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  return { notes: notesWithTags, tags };
};
