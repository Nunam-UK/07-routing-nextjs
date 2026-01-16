'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes, Note } from '@/lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const params = useParams();
  const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : 'all';

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ['notes', slug],
    queryFn: () => fetchNotes(slug),
    staleTime: 1000 * 60 * 5,
  });

  if (isError) return <p>Error loading notes. Please try again later.</p>;

  return (
    <div>
      <NoteForm />
      <SearchBox />
      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList notes={notes || []} />
      )}
      <Pagination />
    </div>
  );
}