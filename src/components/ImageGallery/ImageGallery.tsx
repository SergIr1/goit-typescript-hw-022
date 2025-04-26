import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { Photo } from '../App/App.types';

interface ImageGalleryProps {
  items: Photo[];
  onImageClick: (imageUrl: Photo) => void;
}

export default function ImageGallery({
  items,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li className={css.item} key={item.id}>
          <ImageCard data={item} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
