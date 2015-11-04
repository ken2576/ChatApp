import React, { Component } from 'react';
import { ThreadItem } from './ThreadItem.js';
import { MessageItemFromOther } from './MessageItemFromOther.js';
import { MessageItemFromMe } from './MessageItemFromMe.js';

// ChatApp: 原本的 HTML
export class ChatApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            chat: [
                {name:'Elsa'      , imgsrc:"http://lorempixel.com/50/50/people/1", message:["對阿", "試著", "看左邊嘛"], mymsg:["換我了", "有看到嘛"]},
                {name:'Katharine' , imgsrc:"http://lorempixel.com/50/50/people/9", message:[": )"], mymsg:[] },
                {name:'Marshall'  , imgsrc:"http://lorempixel.com/50/50/people/7", message:[": )"], mymsg:[] }
            ]      ,
            newmsg: ""
        };
    }

    resetState() {
        this.setState({index: 0,
                       chat: [
                           {name:'Elsa'      , imgsrc:"http://lorempixel.com/50/50/people/1", message:["對阿", "試著", "看左邊嘛"], mymsg:["換我了", "有看到嘛"]},
                           {name:'Katharine' , imgsrc:"http://lorempixel.com/50/50/people/9", message:[], mymsg:[] },
                           {name:'Marshall'  , imgsrc:"http://lorempixel.com/50/50/people/7", message:[], mymsg:[] }
                       ]       ,
                       newmsg: ""
        });
    }

    handleInputMessage(event) {
        this.setState({newmsg: event.target.value});
    }


    handleKeyDown(event) {
        const inputValue = event.target.value;
        const newmsg = this.state.newmsg;
        if (event.keyCode == 13 && inputValue !== '') {
            var chat = this.state.chat[this.state.index];
            chat = chat.mymsg.push(newmsg);
            event.target.value="";
            this.setState({newmsg: ""});
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
                        <div className="current-target">{chat[index].name}</div>
                    </div>
                    <div className="message-list">
                        {chat[index].message.map(this.renderMessageItemFromOther, this)}
                        {chat[index].mymsg.map(this.renderMessageItemFromMe, this)}
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


