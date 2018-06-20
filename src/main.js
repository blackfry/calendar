import React from 'react';
import ReactDOM from 'react-dom';
import Calender from './Calendar';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Calender),
    document.getElementById('root')
  );
});
