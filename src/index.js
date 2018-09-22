import React from 'react';
import { render } from "react-dom";
import { LoginButton } from './lib';

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
    <LoginButton></LoginButton>
  </div>
);

render(<App />, document.getElementById("root"));
