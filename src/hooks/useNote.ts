import { useOutletContext } from 'react-router-dom';
import { Note } from '@type/index';

export const useNote = () => {
  return useOutletContext<Note>();
};
