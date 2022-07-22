import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmail } from '../redux/actions';
import './Login.css';
// import Wallet from '../imgs/Wallet.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyInputs());
  }

  validEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  verifyInputs = () => {
    const { password, email } = this.state;
    if (password.length >= +'6' && this.validEmail(email)) {
      this.setState({ isDisabled: false });
    } else this.setState({ isDisabled: true });
  }

  handleDispatch = () => {
    const { email } = this.state;
    const { dispatchEmail, history } = this.props;
    dispatchEmail(email);
    history.push('./carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="inputs">
        {/* <img src={ Wallet } alt="carteira" /> */}
        <h1>Wallet!</h1>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            placeholder="Email: "
            type="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            placeholder="Password: "
            type="password"
            value={ password }
            name="password"
            onChange={ this.handleChange }
            required
          />
        </label>
        <button
          type="submit"
          onClick={ this.handleDispatch }
          disabled={ isDisabled }
        >
          Entrar
        </button>
        <span>Forgot your password?</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(sendEmail(email)) });

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
