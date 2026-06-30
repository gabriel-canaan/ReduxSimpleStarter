import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentDidMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentDidUpdate(prevProps) {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.authenticated}
  }

  return connect(mapStateToProps)(Authentication);
}


// import Authentication  this
// import Resources       Form
//
// const ComposedComponent = Authentication(Resources);
//
// render()
// <ComposedComponent />
