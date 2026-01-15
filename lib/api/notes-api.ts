import axios from 'axios';
import { Note } from '@/types/note';

const instance = axios.create({
  baseURL: 'https://69693e0a69178471522d0048.mockapi.io', 
});

export const fetchNotes = async (tag?: string): Promise<Note[]> => {
  const params = tag && tag !== 'all' ? { tag } : {};
  const { data } = await instance.get<Note[]>('/notes', { params });
  return data;
};