// 'use client';

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';
// import css from './NoteForm.module.css';

// // Функція для відправки даних на твій MockAPI
// const addNote = async (newNote: { title: string; content: string; tag: string }) => {
//   const response = await fetch('https://69693e0a69178471522d0048.mockapi.io/notes', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ...newNote, createdAt: new Date().toISOString() }),
//   });
//   if (!response.ok) throw new Error('Failed to add note');
//   return response.json();
// };

// export default function NoteForm() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tag, setTag] = useState('Work');

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: addNote,
//     onSuccess: () => {
//       // Оновлюємо список нотаток після успішного додавання
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//       setTitle('');
//       setContent('');
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !content) return;
//     mutation.mutate({ title, content, tag });
//   };

//   return (
//     <form className={css.form} onSubmit={handleSubmit}>
//       <div className={css.formGroup}>
//         <label>Title</label>
//         <input
//           type="text"
//           className={css.input}
//           placeholder="Note title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label>Content</label>
//         <textarea
//           className={css.textarea}
//           placeholder="Note content"
//           rows={4}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label>Category (Tag)</label>
//         <select
//           className={css.select}
//           value={tag}
//           onChange={(e) => setTag(e.target.value)}
//         >
//           <option value="Work">Work</option>
//           <option value="Home">Home</option>
//           <option value="Personal">Personal</option>
//         </select>
//       </div>

//       <div className={css.actions}>
//         <button
//           type="button"
//           className={css.cancelButton}
//           onClick={() => { setTitle(''); setContent(''); }}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className={css.submitButton}
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? 'Adding...' : 'Add Note'}
//         </button>
//       </div>

//       {mutation.isError && <p className={css.error}>Something went wrong!</p>}
//     </form>
//   );
// }
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newNote: { title: string; content: string; tag: string }) => {
      const res = await fetch('https://69693e0a69178471522d0048.mockapi.io/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newNote, createdAt: new Date().toISOString() }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setTitle('');
      setContent('');
    },
  });

  return (
    <form className={css.form} onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate({ title, content, tag: 'Work' });
    }}>
      <div className={css.formGroup}>
        <input className={css.input} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className={css.formGroup}>
        <textarea className={css.textarea} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </form>
  );
}