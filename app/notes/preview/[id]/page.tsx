'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes-api';
import Link from 'next/link';

export default function SingleNotePage() {
  const { id } = useParams();
  const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(),
  });

  const note = notes?.find((n) => n.id === id);

  if (isLoading) return <p>Loading...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/notes/filter/all" style={{ color: '#4facfe', marginBottom: '20px', display: 'block' }}>
        ← Back to list
      </Link>
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{note.title}</h1>
      <div style={{ lineHeight: '1.6', fontSize: '18px' }}>{note.content}</div>
      <div style={{ marginTop: '20px', padding: '10px', background: '#eee', display: 'inline-block' }}>
        Tag: {note.tag}
      </div>
    </div>
  );
}