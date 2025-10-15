import React from 'react';
import './GameChat.css';

const GameChat: React.FC = () => {
  return (
    <div className="game-chat">
			<h2>Chat</h2>
			<div className="chat-messages">
			</div>
			<input type="text" placeholder="Type a message..." className="chat-input" />
		</div>
  );
};

export default GameChat;
