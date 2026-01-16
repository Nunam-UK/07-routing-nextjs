'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
}

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id, 
  });

  if (isLoading || !note) return null;

  return (
    <div 
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} 
      onClick={() => router.back()}
    >
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={() => router.back()}>← Close</button>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.date}>
            {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'No date'}
          </div>
        </div>
      </div>
    </div>
  );
}