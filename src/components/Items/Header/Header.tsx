import { FC } from 'react';
import { IItem } from '~/services/getUserItems';
import logout from '../../../services/logout';
import './header-style.scss';
import { Paths } from '~/constants';
import { useHistory } from 'react-router-dom';

interface IHeader {
  items: Array<IItem>;
  username: string;
}

const Header: FC<IHeader> = ({ items, username }) => {
  const { push } = useHistory();

  const onLogoutClick = async () => {
    await logout();
    push(Paths.Login);
  };

  return (
    <div className='header'>
      <div className='user-section'>
        <button onClick={onLogoutClick}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${items.length} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  );
};

export default Header;
