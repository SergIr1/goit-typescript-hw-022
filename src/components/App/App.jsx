import css from './App.module.css';
import { useEffect, useState } from 'react';

import { fetchImage } from '../../js/image-api.js';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from '../Loader/Loader.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

export default function App() {
  // const [clicks, setClicks] = useState(0);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = topic => {
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

  const openModal = imageUrl => {
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
