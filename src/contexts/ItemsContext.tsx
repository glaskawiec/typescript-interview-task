import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';
import getUserItems, { IItem } from '../services/getUserItems';

interface IItemsContext {
  items: Array<IItem>;
  setItems: (items: Array<IItem>) => void;
  errorMessage: string;
  isLoading: boolean;
}

const ItemsContext = createContext<IItemsContext>({
  setItems: () => {},
  items: [],
  errorMessage: null,
  isLoading: true,
});

export const useItemsContext = () => useContext(ItemsContext);

export const ItemsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Array<IItem>>(null);

  const updateItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setItems(userItems);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void updateItems();
  }, []);

  const value = {
    setItems,
    items,
    errorMessage,
    isLoading,
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};
