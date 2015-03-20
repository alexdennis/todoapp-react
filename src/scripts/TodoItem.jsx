'use strict';

var React = require('react');
var classNames = require('classnames');

var TodoItem = React.createClass({
    handleChange: function(ev) {
        if (this.props.data.id === null) {
            // Cannot update until we get back an id from the server
            alert('Not yet persisted. Try again soon.');
            return;
        }

        this.props.onChange({
            id: this.props.data.id,
            text: this.props.data.text,
            done: React.findDOMNode(this.refs.isDone).checked
        });
    },    
    render: function() {    
        var classes = classNames({
            'todoItem': true,
            'done': this.props.data.done
        });

        return (
            <div className={classes}>
                <input type="checkbox" ref="isDone" checked={this.props.data.done} onChange={this.handleChange} />
                {this.props.children}
            </div>
        );
    }
});

module.exports = TodoItem;