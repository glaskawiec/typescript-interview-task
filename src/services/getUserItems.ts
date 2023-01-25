import { API } from '../constants';
import getUrl from '../utils/getUrl';

export interface IItem {
  id: string;
  title: string;
  description: string;
  password: string;
  createdAt: string;
}

interface ItemsResponse {
  items: Array<IItem>;
  error?: {
    message: string;
  };
}

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = (await response.json()) as ItemsResponse;

  if (data?.error) {
    throw new Error(data.error.message);
  }

  return data.items;
};

export default getUserItems;
