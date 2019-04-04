import { API_BASE, API_SUFFIX, MONTHS, NUM_OF_POSTS } from './constants';

export const getHumanReadableTime = (day, monthNo, year) => {
  const month = MONTHS[monthNo];
  return `${month} ${day}, ${year}`;
};

export const getApiURL = id => 
`https://cors-anywhere.herokuapp.com/${API_BASE}/${id}/${API_SUFFIX}`;

export const getRandomPostID = () => 
  (Math.floor(Math.random() * 10000)) % NUM_OF_POSTS;
