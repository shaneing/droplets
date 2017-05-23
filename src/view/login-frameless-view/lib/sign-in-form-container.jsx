/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';

class SignInFormContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      autoSignIn: false,
      remembered: false,
    };
  }

  render() {
    const {handleSubmit, change} = this.props;
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
            id="remembered"
            name="remembered"
            component="input"
            type="checkbox"
            checked={this.state.remembered || this.state.autoSignIn}
            onClick={() => {
              this.setState({
                remembered: !this.state.remembered,
              });
            }}
          />
          <label htmlFor="remembered">Remember password</label>
          <Field
            id="autoSignIn"
            name="autoSignIn"
            component="input"
            checked={this.state.autoSignIn}
            type="checkbox"
            onClick={() => {
              change('remembered', true);
              this.setState({
                autoSignIn: !this.state.autoSignIn,
                remembered: true,
              });
            }}
          />
          <label htmlFor="autoSignIn">Auto sign in</label>
        </div>
        <button className="btn" type="submit">Sign In</button>
        <a
          className="btn-flat"
          onClick={() => {
            this.props.onSignUp();
          }}
        >Sign Up</a>
      </form>
    );
  }
}

SignInFormContainer.propTypes = {
  onSignUp: PropTypes.func,
};

SignInFormContainer.defaultProps = {
  onSignUp: () => {},
};

const form = reduxForm({
  form: 'signin',
});

export default form(SignInFormContainer);
