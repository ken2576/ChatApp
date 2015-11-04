import React, { Component } from 'react';

export class MessageItemFromOther extends React.Component {
    render() {
        return (
            // html -> jsx
            <div className="message-item message-from-other">
                <span>{this.props.message}</span>
            </div>
        );
    }
}


