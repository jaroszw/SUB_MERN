import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/context';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  // any other props that come into the component
}

function RequireAuth({ children }: IProps) {
  const [state] = useContext(UserContext);

  return state.data ? children : <Navigate to="/" />;
}

export default RequireAuth;
