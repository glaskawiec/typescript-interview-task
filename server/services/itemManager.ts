import { passwords } from '../data';

let items = [...passwords];

export const updateItem = (updatedItem) => {
  items = items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
};

export const getItems = () => items;
