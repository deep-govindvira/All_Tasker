import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, onLoginLogout }) {
  const navigate = useNavigate();

  const data = [
    { name: 'Home', url: '' },
    { name: 'Todo', url: '/Todo' },
    { name: 'Note', url: '/Note' },
    { name: 'Expense', url: '/Expense' },
    { name: '', url: ''},
    { name: '', url: ''},
  ];

  // Setting up conditional logic for the 'Logout' or 'Login' menu item
  if (isLoggedIn) {
    data[4].name = 'Logout';
    data[4].url = '#';
    data[5].name = '';
    data[5].url = '#';
  } else {
    data[4].name = 'Login';
    data[4].url = '/login';
    data[5].name = 'Register';
    data[5].url = '/register';
  }

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#basic-navbar-nav"
          aria-controls="basic-navbar-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto">
            {data.map((item, index) => {
              let navItem;
              // logout button
              if (item.url === '#') {
                navItem = (
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => {
                      if (isLoggedIn) {
                        onLoginLogout();
                        navigate('/');
                      }
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {item.name}
                  </button>
                );
              } else {
                navItem = (
                  <NavLink to={item.url} className="nav-link">
                    {item.name}
                  </NavLink>
                );
              }

              return <li className="nav-item" key={index}>{navItem}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
