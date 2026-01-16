'use client';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; 
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

 
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={handleClose}>×</button>
        {children}
      </div>
    </div>
  );
}