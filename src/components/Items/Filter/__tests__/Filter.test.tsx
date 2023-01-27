import { render } from '@testing-library/react';
import { IItem } from '../../../../services/getUserItems';
import renderer from 'react-test-renderer';
import Filter from '../Filter';
import userEvent from '@testing-library/user-event';
import { Paths } from '../../../../constants';

const pushMock = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: pushMock,
  }),
}));

const items: IItem[] = [
  {
    id: '001',
    title: 'Google',
    description: 'My personal account',
    password: 'Password123',
    createdAt: new Date().toISOString(),
  },
  {
    id: '002',
    title: 'Facebook',
    description: 'Facebook account that I manage',
    password: 'SuperDuper5trong!',
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
  },
  {
    id: '003',
    title: 'Github',
    description: 'This is where I store my projects',
    password: 'Password123',
    createdAt: new Date().toISOString(),
  },
  {
    id: '004',
    title: 'Reddit',
    description: 'Front page of internet',
    password: '12345678',
    createdAt: new Date().toISOString(),
  },
  {
    id: '005',
    title: 'Discogs',
    description: 'still waiting for new album',
    password: 'Vardenis2000',
    createdAt: new Date().toISOString(),
  },
  {
    id: '006',
    title: 'keybr',
    description: 'Lets practice',
    password: 'Vardenis2000',
    createdAt: new Date().toISOString(),
  },
  {
    id: '007',
    title: 'hackaday',
    description: 'tech news',
    password: 'password@',
    createdAt: new Date().toISOString(),
  },
  {
    id: '008',
    title: 'soundcloud',
    description: 'music',
    password: 'pavardenis321',
    createdAt: new Date().toISOString(),
  },
  {
    id: '009',
    title: 'discord',
    description: 'rumors',
    password: 'discordPassword123.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '010',
    title: 'airdroid',
    description: 'replace android',
    password: 'pass1',
    createdAt: new Date().toISOString(),
  },
];

const setup = () => {
  return render(<Filter items={items} />);
};

beforeEach(() => {
  pushMock.mockClear();
});

test('should render correctly', () => {
  const tree = renderer.create(<Filter items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should redirect to correct path after clicking on "Weak" filter', async () => {
  const { queryByTestId } = setup();

  const weakFilterButton = queryByTestId('weak-filter');
  await userEvent.click(weakFilterButton);

  expect(pushMock.mock.calls[0][0]).toBe(Paths.Weak);
});

test('should redirect to correct path after clicking on "Old" filter', async () => {
  const { queryByTestId } = setup();

  const weakFilterButton = queryByTestId('old-filter');
  await userEvent.click(weakFilterButton);

  expect(pushMock.mock.calls[0][0]).toBe(Paths.Old);
});

test('should redirect to correct path after clicking on "Reused" filter', async () => {
  const { queryByTestId } = setup();

  const weakFilterButton = queryByTestId('reused-filter');
  await userEvent.click(weakFilterButton);

  expect(pushMock.mock.calls[0][0]).toBe(Paths.Reused);
});
