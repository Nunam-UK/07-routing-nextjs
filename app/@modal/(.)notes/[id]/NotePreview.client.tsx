'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

// 1. Описуємо інтерфейс нотатки, щоб TypeScript не підкреслював note.title тощо
interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
}

export default function NotePreviewClient() {
  const { id } = useParams();
  const router = useRouter();

  // 2. Додаємо <Note> до useQuery, щоб типізувати дані з API
  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
  });

  if (isLoading) return null;

  return (
    /* Зовнішній контейнер для оверлея (затемнення фону) */
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0,0,0,0.8)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 1000 
      }} 
      onClick={() => router.back()}
    >
      {/* 3. Головний контейнер модалки за твоїм ТЗ */}
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <div className={css.item}>
          
          {/* Кнопка закриття за твоїм ТЗ */}
          <button className={css.backBtn} onClick={() => router.back()}>
            ← Close
          </button>

          <div className={css.header}>
            <h2>{note?.title}</h2>
            <span className={css.tag}>{note?.tag}</span>
          </div>

          <p className={css.content}>{note?.content}</p>

          <div className={css.date}>
            {note?.createdAt && new Date(note.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}