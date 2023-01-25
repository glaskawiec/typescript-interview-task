import { API } from '~/constants';
import getUrl from '../utils/getUrl';

interface LoginResponse {
  id: string;
  email: string;
  token: string;
  error?: {
    message: string;
  };
}

const login = async (username: string, password: string) => {
  const response = await fetch(getUrl(API.Login), {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = (await response.json()) as LoginResponse;

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  const { token } = data;
  localStorage.setItem('token', token);
};

export default login;
