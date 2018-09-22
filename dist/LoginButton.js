var _this = this;

import React from 'react';
import './LoginButton.css';

var _onStateChange = function _onStateChange() {};
var _velixIDPartnerToken = null;

function openPopupCenter(url, title, w, h) {
  // Fixes dual-screen position
  // Most browsers use window.screenLeft
  // Firefox uses screen.left
  var dualScreenLeft = getFirstNumber(window.screenLeft, screen.left),
      dualScreenTop = getFirstNumber(window.screenTop, screen.top),
      width = getFirstNumber(window.innerWidth, document.documentElement.clientWidth, screen.width),
      height = getFirstNumber(window.innerHeight, document.documentElement.clientHeight, screen.height),
      left = width / 2 - w / 2 + dualScreenLeft,
      top = height / 2 - h / 2 + dualScreenTop,
      newWindow = window.open(url, title, getSpecs());

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;

  function getSpecs() {
    return 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;
  }

  function getFirstNumber() {
    for (var i = 0, len = arguments.length; i < len; i++) {
      var value = arguments[i];

      if (typeof value === 'number') {
        return value;
      }
    }
  }
}

var _openLoginPopup = function _openLoginPopup(token) {
  _this._popup = openPopupCenter('https://api.velix.id/popup/login/' + token, 'Login with Velix.ID', 500, 500);
};

function onClick(event) {

  _onStateChange({
    state: 'login-init',
    event: event
  });

  if (_velixIDPartnerToken) {
    _openLoginPopup(_velixIDPartnerToken);
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
  _onStateChange = onStateChange;
  return React.createElement(
    'button',
    { 'data-button-type': 'velixid-login', className: 'velixid-button-primary', onClick: onClick },
    label
  );
};

export default LoginButton;