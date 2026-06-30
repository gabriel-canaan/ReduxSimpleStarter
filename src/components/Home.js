import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Home = ({ authenticated }) => (
  <div className='home'>
    <div className='home-hero'>
      <h1>Welcome</h1>
      <p>This app demonstrates the Higher-Order Component pattern for authentication gating in React + Redux.</p>
      {authenticated
        ? <Link to='resources' className='home-cta'>Go to Resources</Link>
        : <Link to='/signin' className='home-cta'>Sign in to get started</Link>
      }
    </div>
    <div className='home-features'>
      <div className='feature'>
        <h3>HOC Auth</h3>
        <p>Routes are protected by a <code>requireAuth</code> HOC that reads from the Redux store and redirects unauthenticated users.</p>
      </div>
      <div className='feature'>
        <h3>Redux Store</h3>
        <p>A single <code>authenticated</code> boolean drives the entire auth state — simple, predictable, easy to extend.</p>
      </div>
      <div className='feature'>
        <h3>React Router</h3>
        <p>Client-side routing keeps navigation fast. Protected routes redirect before rendering any content.</p>
      </div>
    </div>
  </div>
);

export default connect(state => ({ authenticated: state.authenticated }))(Home);
