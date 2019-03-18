
import React from 'react';
import ReactDOM from 'react-dom';

import Test from './Test';

const getDocumentRoot = () => {
  var element = document.createElement('div');
  document.body.appendChild(element);
  return element;
};

ReactDOM.render(<Test />, getDocumentRoot());