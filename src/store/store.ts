import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { RawNote, Tag, NoteData } from '../types';

interface State {
  notes: RawNote[];
  tags: Tag[];
  onCreateNote: (data: NoteData) => void;
}

export const useStore = create<State>()((set) => ({
  notes: JSON.parse(localStorage.getItem('NOTES') || '[]'),
  tags: JSON.parse(localStorage.getItem('TAGS') || '[]'),
  onCreateNote: ({ tags, ...data }) =>
    set((state) => {
      const newNote = [
        ...state.notes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
      localStorage.setItem('NOTES', JSON.stringify(newNote));
      return { notes: newNote };
    }),
}));
