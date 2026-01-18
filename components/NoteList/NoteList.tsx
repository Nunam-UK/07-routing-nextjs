'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      alert('Помилка при видаленні нотатки');
    }
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.noteCard}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <div className={css.actions}>
                <Link href={`/notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button 
                  onClick={() => handleDelete(note.id)}
                  className={css.deleteBtn}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}