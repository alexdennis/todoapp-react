'use strict';

var React = require('react');
var TodoItem = require('./TodoItem.jsx');

var TodoList = React.createClass({
    render: function() {
        var onTodoChange = this.props.onTodoChange;
        var todoNodes = this.props.todos.map(function(todo) {
            return (
                <TodoItem data={todo} onChange={onTodoChange} >
                    {todo.text}
                </TodoItem>
            );
        });
        return (
            <div className="todoList">
                {todoNodes}
            </div>
        );
    }
});

module.exports = TodoList;