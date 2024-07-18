'use client';

import { useSession } from 'next-auth/react';

import { signInGoogle, signOutAll } from '../../actions/auth';

export const HomeNavbar = () => {
  const session = useSession();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Prediction
        </a>
        <button
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {session.data ? (
          <form action={signOutAll}>
            <button type="submit">Sign out</button>
          </form>
        ) : (
          <form action={signInGoogle}>
            <button type="submit">Sign in with Google</button>
          </form>
        )}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a aria-current="page" className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/predictions">
                Predictions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
