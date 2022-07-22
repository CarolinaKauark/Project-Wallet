import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import { HiOutlineMail } from 'react-icons/hi';
// import { BsCoin } from 'react-icons/bs';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <div className="divEmail">
          <HiOutlineMail className="email" />
          <h2 data-testid="email-field">
            {email}
          </h2>
        </div>
        <h2 id="logo">Wallet!</h2>
        <div className="total">
          <span data-testid="total-field">
            Total:
            {' '}
            {expenses.reduce((acc, { value, currency, exchangeRates }) => {
              acc += +(value) * +(exchangeRates[currency].ask);
              return acc;
            }, 0).toFixed(2) }

          </span>
          <div>
            <p data-testid="header-currency-field">BRL</p>
            {/* <BsCoin /> */}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
