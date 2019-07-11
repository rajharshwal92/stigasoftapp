
import { Field } from 'redux-form';
import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { TextFieldInput } from '../../components/common/MaterialUiComponents';
import { reduxForm } from 'redux-form';
import asyncValidate from './validate';
import { postData } from '../../action/common/post';
import * as LOGIN_CONSTANT from '../../constants/login';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
  failure: {
    background: 'red',
    fontSize: '1.4rem'
  },
  success: {
    background: 'green',
    fontSize: '1.4rem'
  }
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isSuccess: false,
    }
  }
  handleSubmit = (formData) => {
    console.log(formData);
    const options = {
      init: LOGIN_CONSTANT.REQUEST_LOGIN,
      success: LOGIN_CONSTANT.RECEIVED_LOGIN,
      error: LOGIN_CONSTANT.RECEIVED_LOGIN_ERROR
    }
    const bodyData = {
      email: formData.email,
      password: formData.password
    };
    const url = LOGIN_CONSTANT.LOGIN_URL;
    this.props.dispatch(postData(url, bodyData, null, options)).then((loginSuccess) => {
      console.log('\n------loginSuccess------\n', loginSuccess);
      this.setState({ message: "Successfully logged in", isSuccess: true });
      setTimeout(() => {
        this.setState({ message: '' });
      }, 6000);
      this.props.history.push('/home');
    }, (error) => {
      console.log('\n---error---\n', error);
      this.setState({ message: error.error || 'Something went wrong!!', isSuccess: false });
      setTimeout(() => {
        this.setState({ message: '' });
      }, 6000);
    })
  }
  handleOpen = () => {
    return true;
  };
  render() {
    const { handleSubmit, classes, theme } = this.props;
    return (
      <div className="login-container">
        <div className="login">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="row">
              <div className="col-sm-12">
                <h2 className="forgot-text">Login</h2>
              </div>
              <div className="form-d col-sm-12">
                <Field name={'email'} label={'Email'} placeholder={'Email'} component={TextFieldInput} />
              </div>
              <div className="form-d col-sm-12">
                <Field name={'password'} label={'Password'} type="password" placeholder={'Password'} component={TextFieldInput} />
              </div>
            </div>
            <div className="btn-parent-full">
              <Button type='submit' variant="contained" color='primary' label="Submit">Submit </Button>
            </div>
          </form>
          {this.state.message && <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.handleOpen()}
            autoHideDuration={6000}
            onClose={() => { }}
            ContentProps={{
              'aria-describedby': 'message-id',
              classes: {
                root: this.state.isSuccess ? classes.success : classes.failure
              }
            }}
            message={<span id="message-id">{this.state.message}</span>}
          />}
        </div>
      </div>
    )
  }
}

const loginForm = reduxForm(
  { form: 'loginform', asyncValidate }
)(Login)

export default connect()(withStyles(styles)(loginForm));