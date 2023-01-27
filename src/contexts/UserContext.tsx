import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';
import getUser from '~/services/getUser';

interface IUser {
  errorMessage: string;
  isLoading: boolean;
  username: string;
}

const UserContext = createContext<IUser>({
  errorMessage: null,
  isLoading: true,
  username: null,
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>(null);

  const updateUser = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const data = await getUser();
      setUsername(data.username);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error?.message);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void updateUser();
  }, []);

  const value = {
    errorMessage,
    isLoading,
    username,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
