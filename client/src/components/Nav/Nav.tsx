import React from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../../context/context';
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
          <React.Fragment>
            <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/articles-plans" className="nav-link">
                Planes
              </Link>
            </NavItem>
          </React.Fragment>
        )}
      </LeftNavContainer>
    </Navbar>
  );
};

export default Nav;
