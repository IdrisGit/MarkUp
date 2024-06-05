import { create } from 'zustand';
import { RawNote, Tag, NoteData, Note } from '@type/index';
import demoNotes from '../assets/demo/demoNotes.json';
import demoTags from '../assets/demo/demoTags.json';

interface State {
  notes: RawNote[];
  tags: Tag[];
  setNotes: (notes: RawNote[]) => void;
  setTags: (tags: Tag[]) => void;
  onCreateNote: (data: Note) => string;
  onUpdateNote: (id: string, { tags, ...data }: NoteData) => string;
  onDeleteNote: (id: string) => void;
  addTag: (tag: Tag) => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

const getNotes = (): RawNote[] => {
  if (window.location.hash.includes('#demo')) {
    if (localStorage.getItem('NOTES') === null) {
      localStorage.setItem('NOTES', JSON.stringify(demoNotes));
      return JSON.parse(JSON.stringify(demoNotes));
    }
  }
  return JSON.parse(localStorage.getItem('NOTES') || '[]');
};

const getTags = (): Tag[] => {
  if (window.location.hash.includes('#demo')) {
    if (localStorage.getItem('TAGS') === null) {
      localStorage.setItem('TAGS', JSON.stringify(demoTags));
      return JSON.parse(JSON.stringify(demoTags));
    }
  }
  return JSON.parse(localStorage.getItem('TAGS') || '[]');
};

export const useStore = create<State>()((set) => ({
  notes: [],
  tags: [],
  setNotes: (notes) => set({ notes }),
  setTags: (tags) => set({ tags }),
  onCreateNote: ({ tags, id, ...data }) => {
    // const id = uuidv4();
    set((state) => {
      const newNotes = [...state.notes, { ...data, id: id, tagIds: tags.map((tag) => tag.id) }];
      localStorage.setItem('NOTES', JSON.stringify(newNotes));
      return { notes: newNotes };
    });
    return id;
  },
  onUpdateNote: (id, { tags, ...data }) => {
    set((state) => {
      const updatedNotes = state.notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        }
        return note;
      });
      localStorage.setItem('NOTES', JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    });
    return id;
  },
  onDeleteNote: (id) =>
    set((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      localStorage.setItem('NOTES', JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    }),
  addTag: (tag) =>
    set((state) => {
      const updatedTags = [...state.tags, tag];
      localStorage.setItem('TAGS', JSON.stringify(updatedTags));
      return { tags: updatedTags };
    }),
  onUpdateTag: (id, label) =>
    set((state) => {
      const updatedTags = state.tags.map((tag) => {
        if (tag.id === id) {
          return {
            ...tag,
            label,
          };
        }
        return tag;
      });
      localStorage.setItem('TAGS', JSON.stringify(updatedTags));
      return { tags: updatedTags };
    }),
  onDeleteTag: (id) =>
    set((state) => {
      const updatedTags = state.tags.filter((tag) => tag.id !== id);
      localStorage.setItem('TAGS', JSON.stringify(updatedTags));
      return { tags: updatedTags };
    }),
}));
