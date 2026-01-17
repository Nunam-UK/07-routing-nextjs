'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { Note } from '@/types/note'; 

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, 
  });

  const handleClose = () => router.back();

  if (isLoading) return null;

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.errorContainer}>
          <p>Помилка завантаження нотатки</p>
          <button onClick={handleClose}>Закрити</button>
        </div>
      </Modal>
    );
  }

  if (!note) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={css.item}>
        <button className={css.backBtn} onClick={handleClose}>
          ← Close
        </button>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.date}>
          {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'No date'}
        </div>
      </div>
    </Modal>
  );
}