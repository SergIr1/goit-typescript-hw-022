import axios from 'axios';

export const fetchImage = async (topic, currentPage) => {
  const axiosParams = {
    params: {
      query: topic,
      client_id: 'B0LAYPd4Gx_4nCCOggKHDmOqCpp-VI6wfsmce2JRUa8',
      page: currentPage,
      per_page: 15,
    },
  };
  console.log(axiosParams);
  const response = await axios.get(
    `https://api.unsplash.com/search/photos`,
    axiosParams
  );
  // `https://api.unsplash.com/search/photos?query=${topic}&client_id=B0LAYPd4Gx_4nCCOggKHDmOqCpp-VI6wfsmce2JRUa8`;
  return response.data.results;
};
