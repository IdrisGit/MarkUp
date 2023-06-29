import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { RawNote, Tag, NoteData } from '../types';

interface State {
  notes: RawNote[];
  tags: Tag[];
  onCreateNote: (data: NoteData) => void;
  onUpdateNote: (id: string, { tags, ...data }: NoteData) => void;
  onDeleteNote: (id: string) => void;
  addTag: (tag: Tag) => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

export const useStore = create<State>()((set) => ({
  notes: JSON.parse(localStorage.getItem('NOTES') || '[]'),
  tags: JSON.parse(localStorage.getItem('TAGS') || '[]'),
  onCreateNote: ({ tags, ...data }) =>
    set((state) => {
      const newNotes = [
        ...state.notes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
      localStorage.setItem('NOTES', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
  onUpdateNote: (id, { tags, ...data }) =>
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
    }),
  onDeleteNote: (id) =>
    set((state) => {
      const updatedNotes = state.notes.filter(
        (note) => note.id !== id,
      );
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
