import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
class RavepayButton extends React.Component {
  onClick = () => {
    var x = getpaidSetup({
      PBFPubKey: "",
      customer_email: "user@example.com",
      amount: 2000,
      customer_phone: "234099940409",
      currency: "NGN",
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
          // redirect to a success page
        } else {
          // redirect to a failure page.
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
