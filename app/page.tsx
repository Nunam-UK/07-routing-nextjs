import Link from 'next/link';
import css from './Home.module.css';

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          Your personal space for thoughts, ideas, and tasks. 
          Organize your life with ease using our simple and powerful note-taking tool.
        </p>
        <Link href="/notes/filter/all" className={css.description} style={{color: '#0d6efd', textDecoration: 'underline'}}>
          Go to my notes →
        </Link>
      </div>
    </main>
  );
}