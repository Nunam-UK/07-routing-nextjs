import Link from 'next/link';
// 1. Імпортуємо об'єкт стилів (це обов'язково)
import css from './SidebarNotes.module.css';

const TAGS = ['Work', 'Personal', 'Home', 'Important'];

export default function SidebarNotes() {
  return (
    // 2. Використовуємо назви класів через об'єкт css
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}