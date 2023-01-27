import { FC } from 'react';
import { Paths } from '../../../constants';
import { IItem } from '../../../services/getUserItems';
import FilterTab from './FilterTab';
import './filter-style.scss';
import itemHasWeakPassword from '../../../utils/itemHasWeakPassword';
import itemHasReusedPassword from '../../..//utils/itemHasReusedPassword';
import itemIsOld from '../../../utils/itemIsOld';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({ items }) => {
  const weakItemsCount = items.reduce(
    (count, item) => (itemHasWeakPassword(item) ? count + 1 : count),
    0,
  );

  const reusedItemsCount = items.reduce(
    (count, item) => (itemHasReusedPassword(item, items) ? count + 1 : count),
    0,
  );

  const oldItemsCount = items.reduce((count, item) => (itemIsOld(item) ? count + 1 : count), 0);

  return (
    <div className='filter'>
      <FilterTab title='Weak' testId='weak-filter' count={weakItemsCount} path={Paths.Weak} />
      <FilterTab
        title='Reused'
        testId='reused-filter'
        count={reusedItemsCount}
        path={Paths.Reused}
      />
      <FilterTab title='Old' testId='old-filter' count={oldItemsCount} path={Paths.Old} />
    </div>
  );
};

export default Filter;
