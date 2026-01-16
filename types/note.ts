export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}