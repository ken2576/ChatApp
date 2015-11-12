import React, { Component } from 'react';
import { ThreadItem } from './ThreadItem.js';
import { MessageItemFromOther } from './MessageItemFromOther.js';
import { MessageItemFromMe } from './MessageItemFromMe.js';
const Rebase = require('re-base');
const base = Rebase.createClass('https://amber-heat-3131.firebaseio.com');


// ChatApp: 原本的 HTML
export class ChatApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            chat: [],
            newmsg: ""
        };
    }

    componentDidMount() {
        this.ref = base.syncState('chat', {
            context: this,
            state: 'chat',
            asArray: true
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    handleInputMessage(event) {
        this.setState({newmsg: event.target.value});
    }


    handleKeyDown(event) {
	const {index, chat, newmsg} = this.state;
        const inputValue = event.target.value;
        if (event.keyCode == 13 && inputValue !== '') {
            chat[index].mymsg.push(newmsg);
            event.target.value="";
            this.setState({chat: chat, newmsg: ""});
        }
        else
        {
            this.handleInputMessage;
        }
    }

    handleThreadClick(i) {
        this.setState({index: i});
    }

    renderMessageItemFromOther(item, i) {
        return (
            <MessageItemFromOther
                key={i}
                message={item}
                />
        );
    }

    renderMessageItemFromMe(item, i) {
        return (
            <MessageItemFromMe
                key={i}
                message={item}
                />
        );
    }

    renderThreadItem(item, i) {
        const {name, imgsrc, message, mymsg} = item;
        const lastmessage = message[message.length - 1];
        return (
            <ThreadItem
                key={i}
                name={name}
                imgaddress={imgsrc}
                content={lastmessage}
                onClick={this.handleThreadClick.bind(this, i)}
                />
        );
    }

    render() {
        const {index, chat, newmsg} = this.state;
        const targetThread = chat[index];
	const targetName = (targetThread && targetThread.name) || 'Loading...';  //in case there's nothing
	const messages = (targetThread && targetThread.message) || []; //in case there's nothing
	const mymsgs = (targetThread && targetThread.mymsg) || []; //in case there's nothing
        return (
            // html -> jsx
            <div className="chat-app clearfix">
                <div className="chat-app_left">
                    <div className="heading">
                        <h3 className="messenger-title">Messenger</h3>
                    </div>
                    <div className="thread-list">
                        {chat.map(this.renderThreadItem, this)}
                    </div>
                </div>
                <div className="chat-app_right">
                    <div className="heading">
                        <div className="current-target">{targetName}</div>
                    </div>
                    <div className="message-list">
                        {messages.map(this.renderMessageItemFromOther, this)}
                        {mymsgs.map(this.renderMessageItemFromMe, this)}
                    </div>
                    <div className="footer">
                        <input className="new-message"
                               type="text"
                               onChange={this.handleInputMessage.bind(this)}
                               onKeyDown={this.handleKeyDown.bind(this)}
                           />
                    </div>
                </div>
            </div>
        );
    }
}


