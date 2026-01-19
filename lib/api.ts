import axios from 'axios';
import { Note } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse, CreateNotePayload } from '@/types/api';


const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (API_TOKEN) {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
  }
  return config;
});

export const fetchNotes = async ({
  page = 1,
  perPage = 6,
  search = '',
  tag = 'all',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  try {
    const { data } = await api.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        perPage,
        search: search.trim() || undefined,
        tag: tag === 'all' ? undefined : tag.toLowerCase(),
      },
    });

    return {
      notes: data.notes,
      totalPages: data.totalPages,
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