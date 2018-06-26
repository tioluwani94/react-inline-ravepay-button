import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
class RavepayButton extends React.Component {
  onClick = () => {
    const {
      email,
      apiKey,
      amount,
      phoneNumber,
      currency = "NGN",
      successCallback,
      failureCallback
    } = this.props;
    var x = getpaidSetup({
      PBFPubKey: apiKey,
      customer_email: email,
      amount: amount,
      customer_phone: phoneNumber,
      currency: currency,
      payment_method: "both",
      txref: "rave-123456",
      onclose: function() {},
      callback: function(response) {
        var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
        console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponseCode == "00" ||
          response.tx.chargeResponseCode == "0"
        ) {
          successCallback();
        } else {
          failureCallback();
        }

        x.close(); // use this to close the modal immediately after payment.
      }
    });
  };
  componentWillMount() {
    if (!!window.RavePay === false) {
      let ravepay = document.createElement("script");
      ravepay.src =
        "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js";
      document.body.appendChild(ravepay);
    }
  }
  componentDidMount() {
    if (!!window.RavePay) {
      console.log("loaded");
    }
  }
  render() {
    return this.props.render(this.onClick);
  }
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <RavepayButton
        render={onClick => <button onClick={onClick}>Pay</button>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
