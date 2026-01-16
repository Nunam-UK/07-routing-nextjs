'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios'; 
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Todo'); 

  const queryClient = useQueryClient();
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  const mutation = useMutation({
    mutationFn: async (newNote: { title: string; content: string; tag: string }) => {
      const { data } = await axios.post(
        'https://69693e0a69178471522d0048.mockapi.io/notes',
        { 
          ...newNote, 
          createdAt: new Date().toISOString() 
        },
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      
      setTitle('');
      setContent('');
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.title}>Create New Note</h3>
      
      <div className={css.formGroup}>
        <input 
          className={css.input} 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required
        />
      </div>

      <div className={css.formGroup}>
        <textarea 
          className={css.textarea} 
          placeholder="Content" 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          required
        />
      </div>

      <div className={css.formGroup}>
        <select 
          className={css.select} 
          value={tag} 
          onChange={e => setTag(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button 
          type="submit" 
          className={css.submitButton} 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Note'}
        </button>
      </div>

      {mutation.isError && <p className={css.error}>Failed to save note.</p>}
    </form>
  );
}