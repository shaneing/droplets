/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';

class SignUpFormContainer extends React.Component {

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="User Name"
          />
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
          <Field
            name="cpassword"
            component="input"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button className="btn" type="submit">Sign Up</button>
        <a
          className="btn-flat"
          onClick={() => {
            this.props.onSignIn();
          }}
        >Sign In</a>
      </form>
    );
  }
}

SignUpFormContainer.propTypes = {
  onSignIn: PropTypes.func,
};

SignUpFormContainer.defaultProps = {
  onSignIn: () => {},
};

const form = reduxForm({
  form: 'signin',
});

export default form(SignUpFormContainer);
