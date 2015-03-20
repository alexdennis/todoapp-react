'use strict';

var React = require('react');
var TodoApp = require('./TodoApp.jsx');

React.render(
  <TodoApp url="/server.php" pollInterval={20000}/>,
  document.getElementById('content')
);