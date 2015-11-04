import React, { Component } from 'react';

export class MessageItemFromMe extends React.Component {
    render() {
        return (
            <div className="message-item message-from-me">
                <span>{this.props.message}</span>
            </div>
        );
    }
}


