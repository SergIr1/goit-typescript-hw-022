import axios from 'axios';
import { Photo } from '../components/App/App.types';

interface SearchResponse {
  page: number;
  per_page: number;
  results: Photo[];
}

export const fetchImage = async (
  topic: string,
  currentPage: number
): Promise<Photo[]> => {
  const axiosParams = {
    params: {
      query: topic,
      client_id: 'B0LAYPd4Gx_4nCCOggKHDmOqCpp-VI6wfsmce2JRUa8',
      page: currentPage,
      per_page: 15,
    },
  };
  // console.log(axiosParams);
  const response = await axios.get<SearchResponse>(
    `https://api.unsplash.com/search/photos`,
    axiosParams
  );
  // `https://api.unsplash.com/search/photos?query=${topic}&client_id=B0LAYPd4Gx_4nCCOggKHDmOqCpp-VI6wfsmce2JRUa8`;
  return response.data.results;
};
