'use client';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function FilteredNotesPage() {
  return (
    <section>
      <h2 style={{ marginBottom: '20px' }}>My Notes</h2>
      <NoteForm />
      <SearchBox />
      <NoteList />
      <Pagination />
    </section>
  );
}