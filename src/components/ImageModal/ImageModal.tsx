import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { Photo } from '../App/App.types';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: Photo | null;
  alt: string;
}

Modal.setAppElement('#root');

export default function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  alt,
}: ImageModalProps) {
  if (!isOpen || !imageUrl) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // Закрытие по ESC и клику вне окна
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img src={imageUrl.urls.regular} alt={alt} className={css.image} />
        <button className={css.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
    </Modal>
  );
}
