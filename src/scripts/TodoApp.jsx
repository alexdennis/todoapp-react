'use strict';

var React = require('react');
var $ = require('jquery');

var TodoList = require('./TodoList.jsx');
var TodoForm = require('./TodoForm.jsx');

var TodoApp = React.createClass({
    getInitialState: function() {
        return {todos: []};
    },
    loadFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(todos) {
                this.setState({todos: todos});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    updateServer: function(how, todo) {
        var url = this.props.url;
        if (how == 'PUT') {
            url += '?id=' + todo.id;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            type: how,
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(todo),
            success: function(todos) {
                this.setState({todos: todos});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleTodoComplete: function(todo) {
        this.updateServer('PUT', todo);
    },
    handleTodoSubmit: function(todoText) {
        var todos = this.state.todos;
        var newTodo = {
            id: null,
            text: todoText,
            done: false
        };
        var newTodos = todos.concat([newTodo]);
        // Update UI state immediately to make things look fast
        this.setState({todos: newTodos});
        this.updateServer('POST', newTodo);
    },
    componentDidMount: function() {
        this.loadFromServer();
        setInterval(this.loadFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="todos">
                <h2 className="header">todos</h2>
                <TodoList todos={this.state.todos} onTodoChange={this.handleTodoComplete} />
                <TodoForm onTodoSubmit={this.handleTodoSubmit} />
            </div>
        );
    }
})

module.exports = TodoApp;