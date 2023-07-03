import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
            <div className="container-fluid">
              <Link className="nav-link" href="/" passHref>
                Home
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" href="/blog" passHref>
                      Blog
                    </Link>
                  </li>
                  {isLoggedIn ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" href="/profile" passHref>
                          Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/account/logout" passHref>
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link" href="/account/login" passHref>
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        );
};

export default Navbar;