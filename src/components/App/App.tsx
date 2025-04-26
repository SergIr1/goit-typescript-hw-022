import css from './App.module.css';
import { useEffect, useState } from 'react';

import { fetchImage } from '../../js/image-api.js';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Photo } from './App.types';

export default function App() {
  // const [clicks, setClicks] = useState(0);
  const [image, setImage] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (topic: string) => {
    setSearchTerm(topic);
    setPage(1);
    setImage([]);
    setHasMore(true);
  };

  useEffect(() => {
    if (searchTerm === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchImage(searchTerm, page);
        console.log(data);
        if (data.length === 0 || data.length < 15) {
          setHasMore(false);
        }

        setImage(prevImages => {
          return [...prevImages, ...data];
        });
      } catch {
        setError(true);
        toast.error('Whoops there was an error plz reload...', {
          duration: 4000,
          position: 'top-right',
          className: `${css['custom-toast-error']} ${css['error']}`,
        });
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [searchTerm, page]);

  const openModal = (imageUrl: Photo) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {image.length > 0 && (
        <ImageGallery items={image} onImageClick={openModal} />
      )}

      {/* {image.length > 0 && <ImageGallery items={image} />} */}

      {isLoading && <Loader loading={isLoading} />}
      {/* <p className={css.text}>Loading data, please is wait...</p> */}

      {error && <ErrorMessage />}

      {image.length > 0 && !isLoading && hasMore && (
        <LoadMoreBtn page={page} onPage={setPage} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
        alt="Selected"
      />
      <Toaster position="top-right" />
    </div>
  );
}
