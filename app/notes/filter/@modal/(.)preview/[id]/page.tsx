'use client';
import Modal from '@/components/Modal/Modal';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes-api';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const { id } = useParams();
  const router = useRouter();
  
  const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(),
  });

  const note = notes?.find((n) => n.id === id);

  return (
    <Modal>
      {isLoading ? (
        <p>Loading...</p>
      ) : note ? (
        <div className={css.container}>
          <article className={css.item}>
            <header className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </header>
            
            <div className={css.content}>
              {note.content}
            </div>

            <footer className={css.date}>
              {/* Якщо у твоїх даних є createdAt, виведемо її */}
              {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
            </footer>

            <button 
              className={css.backBtn} 
              onClick={() => router.back()}
            >
              Back to list
            </button>
          </article>
        </div>
      ) : (
        <p>Note not found</p>
      )}
    </Modal>
  );
}