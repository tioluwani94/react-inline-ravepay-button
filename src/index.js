import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './styles.css';
class RavepayButton extends React.Component {
  state = {
    loaded: true,
  };
  static defaultProps = {
    email: '',
    apiKey: '',
    amount: '',
    phoneNumber: '',
    currency: 'NGN',
    firstName: '',
    lastName: '',
    successCallback: () => {},
    failureCallback: () => {},
    closeCallback: () => {},
    txref: '',
  };
  static propTypes = {
    email: PropTypes.string,
    apiKey: PropTypes.string,
    amount: PropTypes.string,
    phoneNumber: PropTypes.string,
    currency: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    successCallback: PropTypes.func,
    failureCallback: PropTypes.func,
    closeCallback: PropTypes.func,
    txref: PropTypes.string,
  };
  onClick = () => {
    const {
      email,
      apiKey,
      amount,
      phoneNumber,
      firstName,
      lastName,
      currency,
      successCallback,
      failureCallback,
      closeCallback,
      transactionRef,
    } = this.props;
    var x = window.getpaidSetup({
      PBFPubKey: apiKey,
      customer_email: email,
      amount: amount,
      customer_phone: phoneNumber,
      customer_firstname: firstName,
      customer_lastname: lastName,
      currency: currency,
      payment_method: 'both',
      txref: transactionRef,
      onclose: closeCallback,
      callback: function(response) {
        var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
        console.log('This is the response returned after a charge', response);
        if (
          response.tx.chargeResponseCode === '00' ||
          response.tx.chargeResponseCode === '0'
        ) {
          successCallback(txref);
        } else {
          failureCallback();
        }

        x.close(); // use this to close the modal immediately after payment.
      },
    });
  };
  componentWillMount() {
    if (!!window.RavePay === false) {
      let ravepay = document.createElement('script');
      ravepay.src =
        'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js';
      document.body.appendChild(ravepay);
      this.setState({
        loaded: false,
      });
    }
  }
  componentDidMount() {
    if (!!window.RavePay) {
      console.log('loaded');
    }
  }
  render() {
    const { loaded } = this.state;
    return this.props.render(this.onClick, loaded);
  }
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <RavepayButton
        render={(onClick, loaded) => (
          <button onClick={onClick} disabled={loaded}>
            Pay
          </button>
        )}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
