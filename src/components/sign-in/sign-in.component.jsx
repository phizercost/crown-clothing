import React from "react";

import "./sign-in.styles.scss";

import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle} from '../../firebase/firebase.util';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const {email, password} = this.state;

    try{
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: ''});
    }catch(error){
      console.error(error);

    }
    this.setState({ email: "", password: "" });
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
          <CustomButton type="submit">Sign In</CustomButton> 
          <CustomButton onClick= {signInWithGoogle} isGoogleSignedIn>
          {' '}
          Sign in with  Google{' '}
          </CustomButton> </div>
        </form>
      </div>
    );
  }
}

export default SignIn;