'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

export default function NoteDetailsClient() {
  const { id } = useParams();
  const router = useRouter();
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <h1>{note?.title}</h1>
      <p>{note?.content}</p>
    </div>
  );
}