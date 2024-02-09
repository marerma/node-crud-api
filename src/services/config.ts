export const BASE_URL = '/api/users';

export const getAppStatus = () => {
  const isMultiMode = process.env.SERVER_MODE === 'multi';
  return { isMultiMode}
}

