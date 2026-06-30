import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate } from '../actions';

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: '' };
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: 'Username and password are required.' });
      return;
    }
    if (username !== 'user' || password !== 'password') {
      this.setState({ error: 'Invalid username or password.' });
      return;
    }
    this.props.authenticate(true);
    this.context.router.push('/');
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <div className='signin-form'>
        <h2>Sign In</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={e => this.onSubmit(e)}>
          <div>
            <label>Username</label>
            <input
              type='text'
              value={username}
              onChange={e => this.setState({ username: e.target.value, error: '' })}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={e => this.setState({ password: e.target.value, error: '' })}
            />
          </div>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { authenticate })(SignIn);
