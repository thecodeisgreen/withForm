
import React from 'react'
import ReactDOM from 'react-dom';

const Test = () => {
  return (
    <div>
      Hello kjhjhkjlhklj
    </div>
  )
}

const getDocumentRoot = () => {
  var element = document.createElement('div');
  document.body.appendChild(element);
  return element;
};

ReactDOM.render(<Test />, getDocumentRoot());