// lib/api.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}


const BASE_URL = 'https://69693e0a69178471522d0048.mockapi.io/notes';

export const fetchNotes = async (slug: string = 'all'): Promise<Note[]> => {

  const url = (slug === 'all' || !slug) ? BASE_URL : `${BASE_URL}?tag=${slug}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }
  
  return response.json();
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Note not found');
  return response.json();
};