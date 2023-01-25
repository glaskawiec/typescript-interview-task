import { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface IFilterTab {
  title: string;
  count: number;
  path: string;
  testId?: string;
}

const FilterTab: FC<IFilterTab> = ({ title, count, path, testId }) => {
  const { push } = useHistory();

  return (
    <div className='filter-tab' data-testid={testId} onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
};

export default FilterTab;
