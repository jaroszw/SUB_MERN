import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  data: { id: string; email: string; stripeCustomerId: string } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: false, error: null }, () => {}]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: false,
    error: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  const fetchUser = async () => {
    setUser({ ...user, loading: true });

    const { data: response } = await axios.get("http://localhost:8080/auth/me");
    if (response?.data?.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
          stripeCustomerId: response.data.user.stripeCustomerId,
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

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
