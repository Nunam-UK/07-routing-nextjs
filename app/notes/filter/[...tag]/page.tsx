'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes-api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react'; 
import css from './NoteList.module.css';

export default function NotesPage() {
  const params = useParams();
  
  
  const tag = params?.tag ? (Array.isArray(params.tag) ? params.tag[0] : params.tag) : 'all';

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes(tag),
    
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes. Please try again later.</p>;

  return (
    <div className={css.notesWrapper}>
      <ul className={css.list}>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id} className={css.listItem}>
              <div>
                <h3 className={css.title}>{note.title}</h3>
                <p className={css.content}>{note.content}</p>
              </div>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                
                <Link href={`/notes/preview/${note.id}`} className={css.link}>
                  View details
                </Link>
              </div>
            </li>
          ))
        ) : (
            <p>No notes found for this category.
              
          </p>
        )}
      </ul>
    </div>
  );
}

