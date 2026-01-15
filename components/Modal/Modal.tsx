'use client';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className={css.backdrop} onClick={() => router.back()}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={() => router.back()}>×</button>
        {children}
      </div>
    </div>
  );
}