import getUrl from '~/utils/getUrl';
import { API } from '~/constants';

const logout = async () => {
  const url = getUrl(API.Logout);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.ok) {
    localStorage.removeItem('token');
  }
};

export default logout;
