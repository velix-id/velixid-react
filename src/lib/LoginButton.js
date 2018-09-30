import React from 'react';
import './LoginButton.css';

import VelixID from "velixid.js";

let _onStateChange = function () { };
let _velixIDPartnerToken = null;

VelixID.on(VelixID.EVENTS.LOGIN, (data) => {
  _onStateChange({
    state: VelixID.EVENTS.LOGIN,
    event: data
  })
});
VelixID.on(VelixID.EVENTS.ERROR, (data) => {
  _onStateChange({
    state: VelixID.EVENTS.ERROR,
    event: data
  })
});
VelixID.on(VelixID.EVENTS.REJECT, (data) => {
  _onStateChange({
    state: VelixID.EVENTS.REJECT,
    event: data
  })
});
VelixID.on(VelixID.EVENTS.CANCEL, (data) => {
  _onStateChange({
    state: VelixID.EVENTS.CANCEL,
    event: data
  })
});

function onClick(event) {
  _onStateChange({
    state: 'login-init',
    event: event
  });

  if (_velixIDPartnerToken) {
    VelixID._openLoginPopup(_velixIDPartnerToken)
  } else {
    _onStateChange({
      state: 'login-failed',
      reason: 'Token Missing'
    });
  }
}

const LoginButton = ({ label = 'Login with Velix.ID', token, onStateChange = () => { } }) => {
  _velixIDPartnerToken = token;
  VelixID.init({
    token: token,
    disableButtonSetup: true
  })
  _onStateChange = onStateChange;
  return <button data-button-type="velixid-login" className="velixid-button-primary" onClick={onClick}>{label}</button>
}

export default LoginButton;