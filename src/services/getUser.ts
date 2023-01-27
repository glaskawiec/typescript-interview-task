import getUrl from '~/utils/getUrl';
import { API } from '~/constants';

interface UserResponse {
  username: string;
  email: string;
  id: string;
  error?: {
    message: string;
  };
}

const getUser = async (): Promise<UserResponse> => {
  const response = await fetch(getUrl(API.User), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = (await response.json()) as UserResponse;

  if (data?.error) {
    throw new Error(data.error.message);
  }

  return data;
};

export default getUser;
