import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, imageUrl, alt }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // Закрытие по ESC и клику вне окна
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img src={imageUrl} alt={alt} className={css.image} />
        <button className={css.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
    </Modal>
  );
}
