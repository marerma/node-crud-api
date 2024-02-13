import { BASE_URL } from '../services/config';

export const getUserIdFromUrl = (path: string = '') => {
  if (path === BASE_URL || path === BASE_URL + '/') return null;

  const pathParts = path.split(BASE_URL + '/');

  const userId = pathParts.length === 2 ? pathParts[1] : null;
  return userId;
};
