import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import style from './style/Navigation.module.sass';

function Navigation() {
  const location = useLocation();
  const showButtons = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {showButtons && (
        <nav className={style.nav}>
          <Button as={Link} to="/login" variant="primary">Log In</Button>
          <Button as={Link} to="/register" variant="primary">Sign Up</Button>
        </nav>
      )}
    </div>
  );
}

export default Navigation;