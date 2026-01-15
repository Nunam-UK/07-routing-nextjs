import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p>© 2026 NoteHub. Created for GoIT Academy.</p>
      </div>
    </footer>
  );
}