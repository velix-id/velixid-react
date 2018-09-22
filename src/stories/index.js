import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import LoginButton from '../lib/LoginButton';

action('onVelixIDStateChange');

const partnerToken = 'V12345678:DKt54PbufRudgF9LnNVXuhXVFdvbvx2N';

storiesOf('Login Button', module)
  .add('Default', () => <LoginButton token={partnerToken}></LoginButton>)
  .add('Custom Label', () => <LoginButton token={partnerToken} label="Custom Label"></LoginButton>)
  .add('onStateChange', () => <LoginButton token={partnerToken} onStateChange={action('onVelixIDStateChange')}></LoginButton>)
  .add('onStateChange with missing token', () => <LoginButton onStateChange={action('onVelixIDStateChange')}></LoginButton>);
