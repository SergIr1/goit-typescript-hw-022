import { Photo } from '../App/App.types';
import css from './ImageCard.module.css';

interface ImageCardProps {
  data: Photo;
  onImageClick: (imageUrl: Photo) => void;
}

export default function ImageCard({ data, onImageClick }: ImageCardProps) {
  const {
    urls: { small, regular },
    slug,
    likes,
    user,
    description,
  } = data;
  return (
    <>
      <div className={css.container}>
        <img
          className={css.img}
          src={small}
          alt={slug}
          width={'400px'}
          height={'260px'}
          onClick={() => onImageClick(data)}
        />
        <div className={css.info}>
          <h2 className={css.title}>
            {description || 'No description available'}
          </h2>
          <div className={css.wrapper}>
            <p className={css.text}>Photo by: {user?.name || 'Unknown'}</p>
            <p className={css.text}>Likes: {likes}</p>
          </div>
        </div>
      </div>
    </>
  );
}
