import axios from 'axios';
import { Note } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse, CreateNotePayload } from '@/types/api';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
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
    // ВАЖЛИВА ПРАВКА: Робимо першу літеру великою, якщо це не 'all'
    // Наприклад: 'work' -> 'Work'
    const normalizedTag = tag === 'all' 
      ? undefined 
      : tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

    const { data } = await api.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        perPage,
        search: search.trim() || undefined,
        tag: normalizedTag, 
      },
    });

    return data;
  } catch (error) {
    console.error('Fetch notes error:', error);
    return { notes: [], totalPages: 0 };
  }
};

// ... решта функцій без змін (fetchNoteById, createNote, deleteNote)
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