import { FC } from 'react';
import { IItem } from '~/services/getUserItems';
import ItemIcon from './ItemIcon';
import './list-style.scss';
import UpdateModal from './UpdateModal';

interface IList {
  items: Array<IItem>;
}

const List: FC<IList> = ({ items }) => (
  <ul className='list'>
    {items.map((item) => (
      <li className='item' key={item.id}>
        <ItemIcon title={item.title} />
        <div>
          <div className='title'>{item.title}</div>
          <div className='description'>{item.description}</div>
        </div>
        <UpdateModal item={item} />
      </li>
    ))}
  </ul>
);

export default List;
