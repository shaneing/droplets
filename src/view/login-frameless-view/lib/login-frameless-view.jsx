import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import SignInFormContainer from './sign-in-form-container';
import SignUpFormContainer from './sign-up-form-container';
import * as remote from '../../../remote';
import '../styles/login-frameless-view.css';

class LoginFramelessView extends React.Component {

  constructor() {
    super();
    this.state = {
      visibleSignInForm: true,
      visibleSignUpForm: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  toggle() {
    this.setState({
      visibleSignInForm: !this.state.visibleSignInForm,
      visibleSignUpForm: !this.state.visibleSignUpForm,
    });
  }

  handleSignInSubmit(values) {
    console.log(values);
    remote.droplets.api.authorization.create({
      username: values.username,
      password: values.password,
      callback: (err) => {
        if (!err) {
          if (values.autoSignIn) {
            remote.droplets.user.setCurrentUser({
              username: values.username,
              password: values.password,
            });
          }
          if (values.remembered) {
            remote.droplets.user.add({
              username: values.username,
              password: values.password,
            });
          }
          this.bootUserApp();
        }
      },
    });
  }

  handleSignUpSubmit(values) {
    if (values.password === values.cpassword) {
      remote.droplets.api.user.create({
        username: values.username,
        password: values.password,
        callback: (err) => {
          console.log(err);
        },
      });
    }
  }

  renderSignInForm() {
    if (this.state.visibleSignInForm) {
      return (
        <div className="signin-modal">
          <SignInFormContainer
            onSubmit={this.handleSignInSubmit}
            onSignUp={() => {
              this.toggle();
            }}
          />
        </div>
      );
    }
    return null;
  }

  renderSignUpForm() {
    if (this.state.visibleSignUpForm) {
      return (
        <div className="signup-modal">
          <SignUpFormContainer
            onSubmit={this.handleSignUpSubmit}
            onSignIn={() => {
              this.toggle();
            }}
          />
        </div>
      );
    }
    return null;
  }

  bootVisitorApp() {
    ReactDOM.unmountComponentAtNode(document.getElementById('droplets'));
    remote.droplets.closeFrameLessWindow();
    remote.droplets.createVisitorLevelMainWindow();
  }

  bootUserApp() {
    ReactDOM.unmountComponentAtNode(document.getElementById('droplets'));
    remote.droplets.closeFrameLessWindow();
    remote.droplets.createUserLevelMainWindow();
  }


  render() {
    return (
      <div className="login-frameless-view">
        <div className="header">
          <h1 className="title"><i>Droplets</i></h1>
          <i
            className="close material-icons md-18"
            onClick={() => {
              remote.droplets.exit(0);
            }}
          >close</i>
        </div>
        <div className="content">
          <ReactCSSTransitionGroup
            transitionName="fade"
          >
            {this.renderSignInForm()}
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            transitionName="fade"
          >
            {this.renderSignUpForm()}
          </ReactCSSTransitionGroup>
        </div>
        <div className="footer">
          <a
            className="btn-flat"
            onClick={() => {
              this.bootVisitorApp();
            }}
          >No thanks.</a>
        </div>
      </div>
    );
  }
}

export default LoginFramelessView;
