import React from 'react';
import './LoginButton.css';

import VelixID from "velixid.js";

var _onStateChange = function _onStateChange() {};
var _velixIDPartnerToken = null;

VelixID.on(VelixID.EVENTS.LOGIN, function (data) {
  _onStateChange({
    state: VelixID.EVENTS.LOGIN,
    event: data
  });
});
VelixID.on(VelixID.EVENTS.ERROR, function (data) {
  _onStateChange({
    state: VelixID.EVENTS.ERROR,
    event: data
  });
});
VelixID.on(VelixID.EVENTS.REJECT, function (data) {
  _onStateChange({
    state: VelixID.EVENTS.REJECT,
    event: data
  });
});
VelixID.on(VelixID.EVENTS.CANCEL, function (data) {
  _onStateChange({
    state: VelixID.EVENTS.CANCEL,
    event: data
  });
});

function onClick(event) {
  _onStateChange({
    state: 'login-init',
    event: event
  });

  if (_velixIDPartnerToken) {
    VelixID._openLoginPopup(_velixIDPartnerToken);
  } else {
    _onStateChange({
      state: 'login-failed',
      reason: 'Token Missing'
    });
  }
}

var LoginButton = function LoginButton(_ref) {
  var _ref$label = _ref.label,
      label = _ref$label === undefined ? 'Login with Velix.ID' : _ref$label,
      token = _ref.token,
      _ref$onStateChange = _ref.onStateChange,
      onStateChange = _ref$onStateChange === undefined ? function () {} : _ref$onStateChange;

  _velixIDPartnerToken = token;
  VelixID.init({
    token: token,
    disableButtonSetup: true
  });
  _onStateChange = onStateChange;
  return React.createElement(
    'button',
    { 'data-button-type': 'velixid-login', className: 'velixid-button-primary', onClick: onClick },
    label
  );
};

export default LoginButton;