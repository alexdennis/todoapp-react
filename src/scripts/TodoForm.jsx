'use strict';

var React = require('react');

var TodoForm = React.createClass({
    handleSubmit: function(e)
    {
        e.preventDefault();
        var text = React.findDOMNode(this.refs.text).value.trim();
        if (!text) {
            return;
        }

        this.props.onTodoSubmit(text);
        React.findDOMNode(this.refs.text).value = '';
    },
    render: function() {
        return (
            <form className="todoForm" onSubmit={this.handleSubmit} >
                <input type="text" placeholder="What needs to be done?" ref="text" />
            </form>
        );
    }
});

module.exports = TodoForm;