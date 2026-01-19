import axios from 'axios';
import { Note } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse, CreateNotePayload } from '@/types/api';

const api = axios.create({
  baseURL: 'https://69693e0a69178471522d0048.mockapi.io',
});

export const fetchNotes = async ({
  page = 1,
  perPage = 6, 
  search = '',
  tag = 'all',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  try {
    const { data } = await api.get<Note[]>('/notes', {
      params: {
        page,
        limit: perPage,
        search: search.trim() || undefined,
        tag: tag === 'all' ? undefined : tag,
      },
    });

    const totalCount = 20; 
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      notes: data,
      totalPages: totalPages,
    };
  } catch (error) {
    console.error('Fetch notes error:', error);
    return { notes: [], totalPages: 0 };
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};