'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal'; 
import css from './Notes.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const debouncedSearch = useDebounce(search, 500);

  
  const { data, isLoading, isError } = useQuery({
    
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes({ 
      tag, 
      search: debouncedSearch, 
      page, 
      limit: 6 
    }),
    refetchOnMount: false, 
  });

  if (isError) return <p className={css.error}>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <div className={css.topBar}>
        
        <SearchBox value={search} onChange={(val) => {
          setSearch(val);
          setPage(1); 
        }} />
        
        <button 
          className={css.addBtn} 
          onClick={() => setIsModalOpen(true)}
        >
          Add New Note
        </button>
      </div>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
       
        <NoteList notes={data?.notes || []} />
      )}

      <Pagination 
        currentPage={page} 
        totalPages={data?.totalPages || 1} 
        onPageChange={setPage} 
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}