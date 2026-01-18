import axios from 'axios';
import { Note } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse } from '@/types/api';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: 'https://69693e0a69178471522d0048.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  limit = 6,
  search = '',
  tag = 'all',
}: FetchNotesParams): Promise<FetchNotesResponse> => {

  const queryParams = {
    page,
    perPage: limit, 
    search: search || undefined,
    tag: tag !== 'all' ? tag : undefined,
  };

  try {
    const { data } = await api.get<Note[]>('/notes', {
      params: {
        page: queryParams.page,
        limit: queryParams.perPage, 
        search: queryParams.search,
        tag: queryParams.tag,
      },
    });

    return {
      notes: data,
      totalPages: Math.ceil(20 / limit),
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

export const createNote = async (noteData: Omit<Note, 'id' | 'createdAt'>): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};