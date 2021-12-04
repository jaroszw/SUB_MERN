import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../../context/index';
import styled from 'styled-components';

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: '' });
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar>
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>
      <LeftNavContainer>
        {state.data && (
          <NavItem>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        )}
      </LeftNavContainer>
    </Navbar>
  );
};

export default Nav;
