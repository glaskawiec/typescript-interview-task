import { render, fireEvent } from '@testing-library/react';
import { IItem } from '../../../../services/getUserItems';
import UpdateModal from '../UpdateModal';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

const fetchMock = jest.fn();
global.fetch = fetchMock;

beforeEach(() => {
  fetchMock.mockClear();
});

const testItem: IItem = {
  id: '001',
  title: 'Google',
  description: 'My personal account',
  password: 'Password123',
  createdAt: new Date().toDateString(),
};

const setup = () => render(<UpdateModal item={testItem} />);

test('should open modal after clicking "Update Password" button', async () => {
  const { queryByTestId, getByText } = setup();

  const modal = await queryByTestId('modal');
  expect(modal).toBeNull();

  const updatePasswordButton = getByText('Update Password');
  await userEvent.click(updatePasswordButton);
  expect(modal).toBeDefined();
});

test('should close modal after clicking "Cancel" button', async () => {
  const { queryByTestId, getByText } = setup();

  const updatePasswordButton = getByText('Update Password');
  await userEvent.click(updatePasswordButton);

  const cancelButton = getByText('Cancel');
  await userEvent.click(cancelButton);

  expect(await queryByTestId('modal')).toBeNull();
});

test('should send correct update item request after clicking on "Change" button', async () => {
  const { queryByTestId, getByText, getByPlaceholderText } = setup();

  const updatePasswordButton = getByText('Update Password');

  await userEvent.click(updatePasswordButton);

  const changeButton = await getByText('Change');
  const input = getByPlaceholderText('new password');

  const NEW_PASSWORD = 'new test password';

  fireEvent.change(input, { target: { value: NEW_PASSWORD } });

  await userEvent.click(changeButton);

  // check if fetch was called with new password from input
  expect(fetchMock.mock.calls[0][1].body).toBe(
    JSON.stringify({ ...testItem, password: NEW_PASSWORD }),
  );

  expect(await queryByTestId('modal')).toBeNull();
});
