import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ResendConfirmation from './ResendConfirmation';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user.messages.login.failure) {
      this.setState({error: nextProps.user.messages.login.failure});
    }
  }


  componentDidUpdate() {
    if (this.props.user.authenticated) {
      this.props.history.push("/dashboard");
    }
  }


  onInputChange(value, type) {
    this.setState({[type]: value});
  }


  submit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }


  render() {
    let content = (
      <form onSubmit={this.submit}>
        <p>{this.props.user.messages.login.failure}</p>
        <TextField fullWidth onChange={(e,v)=>this.onInputChange(v,"email")} name="email" floatingLabelText="E-mail" />
        <TextField fullWidth onChange={(e,v)=>this.onInputChange(v,"password")} name="password" type="password" floatingLabelText="Password" />
        <br />
        <br />
        <RaisedButton label="Submit" type="submit" name="submit" primary fullWidth />
        <FlatButton onClick={()=>this.props.toggleComponent('login')} label={"Go back"} />
        <FlatButton 
          label="Forgot password?"
          labelStyle={{color:"#a5bde0"}}
          onClick={()=>this.props.toggleComponent('requestPasswordReset')}
        />
      </form>
    );

    if (this.props.user.messages.login.failure && this.props.user.messages.login.failure.includes("unconfirmed")) {
      content = (
        <ResendConfirmation 
          resendConfirmation={this.props.resendConfirmation}
          message="Your account has not yet been activated.  Resend confirmation email?" 
          email={this.state.email}
          tapCancel={()=>this.props.toggleComponent('login')}
        />
      );
    }

    return (content);
  }
}

export default Login;
