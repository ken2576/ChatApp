import React, { Component } from 'react';

export class ThreadItem extends React.Component {
    render() {
        return (
            // html -> jsx
            <div>
                <li className="thread-item"
                    onClick={this.props.onClick}>
                    <div className="clearfix">
                        <div className="thread-item_left">
                            <img className="img-circle" src={this.props.imgaddress} width="50" height="50" alt=""></img>
                        </div>
                        <div className="thread-item_right">
                            <div className="thread-from">
                                {this.props.name}
                            </div>
                            <div>
                                <span className="thread-content">{this.props.content}</span>
                            </div>
                            <span className="thread-time">12:27am</span>
                        </div>
                    </div>
                </li>
            </div>
     );
    }
}


