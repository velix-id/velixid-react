import React from 'react';
import './LoginButton.css';

let _onStateChange = function () { };
let _velixIDPartnerToken = null;

function openPopupCenter(url, title, w, h) {
  // Fixes dual-screen position
  // Most browsers use window.screenLeft
  // Firefox uses screen.left
  var dualScreenLeft = getFirstNumber(window.screenLeft, screen.left),
    dualScreenTop = getFirstNumber(window.screenTop, screen.top),
    width = getFirstNumber(window.innerWidth, document.documentElement.clientWidth, screen.width),
    height = getFirstNumber(window.innerHeight, document.documentElement.clientHeight, screen.height),
    left = ((width / 2) - (w / 2)) + dualScreenLeft,
    top = ((height / 2) - (h / 2)) + dualScreenTop,
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

let _openLoginPopup = (token) => {
  this._popup = openPopupCenter('https://api.velix.id/popup/login/' + token, 'Login with Velix.ID', 500, 500);
}

function onClick(event) {

  _onStateChange({
    state: 'login-init',
    event: event
  });

  if (_velixIDPartnerToken) {
    _openLoginPopup(_velixIDPartnerToken)
  } else {
    _onStateChange({
      state: 'login-failed',
      reason: 'Token Missing'
    });
  }
}


const LoginButton = ({ label = 'Login with Velix.ID', token, onStateChange = () => { } }) => {
  _velixIDPartnerToken = token;
  _onStateChange = onStateChange;
  return <button data-button-type="velixid-login" className="velixid-button-primary" onClick={onClick}>{label}</button>
}

export default LoginButton;