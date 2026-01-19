import { Note } from './note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number; 
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}