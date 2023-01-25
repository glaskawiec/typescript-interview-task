import { stringify } from 'query-string';
import { API } from '../constants';

const getUrl = (endpoint: API, params?: Record<string, number | string>) => {
  const query = stringify(params);

  return `${process.env.API_URL}/${endpoint}${query ? `?${query}` : ''}`;
};

export default getUrl;
