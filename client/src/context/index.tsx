import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  data: { id: string; email: string } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, error: null }, () => {}]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem('token');

  console.log('SETTING STATE FROM CONTEXT NO USE EFFECT');
  useEffect(() => {
    if (token) {
      console.log('SETTING STATE FROM CONTEXT');
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: true,
        error: null,
      });
    }
  }, [token]);

  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get('http://localhost:8080/auth/me');
    if (response?.data?.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.error.length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
