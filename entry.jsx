import React from 'react';
import Home from './components/home';
import {render} from 'react-dom';
import {ipcRenderer} from 'electron';

const Root = () => (
  <div>
    <h1> SUP! </h1>
    <Home/>
  </div>
);

document.addEventListener("DOMContentLoaded", () => {
  console.log('sup!!!');
  const root = document.querySelector("#root");
  render(<Root/>, root);
});
