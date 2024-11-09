// components/GroupChat.js
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './Auth/AxiosInstance';
import './styles/GroupChat.css'

const API_URL = process.env.REACT_APP_API_URL; // Your API base URL

const GroupChat = ({groupChatId}) => {

  const params = useParams();
  const groupId = groupChatId || params.groupId;

  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  const userId = localStorage.getItem('userId'); // Make sure this key matches where you store the user ID

  // Fetch messages when the component mounts or when the groupId changes

  const fetchGroupData = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/groupchat/group/${groupId}`);
      setParticipants(response.data.participants);
      setMessages(response.data.messages); // Set messages to state
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchGroupData(); // Initial fetch
  }, []); // Run effect when groupId changes

  // Send a message to the group chat
  const sendMessage = async () => {
    if (!messageContent.trim()) return; // Do not send if the message is empty

    try {
      await axiosInstance.post(`${API_URL}/api/groupchat/${groupId}/message`, {
        message: messageContent.trim(), // Message content
      });
      setMessageContent(''); // Clear input field
      fetchGroupData(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleBack = async () => {
    navigate('/inbox');
  }

  const getSenderDetails = (senderId) => {
    const sender = participants.find(participant => participant.userId === senderId);
    return sender; // Fallback in case sender is not found
  };

  return (
  <div>
  
  <div className="group-chat">
    
    <div className="chat-container">
      <div className="participants">
        {participants.map((participant) => (
          <div key={participant.userId} className="participant">
            <img src={participant.profile.profilePicture ? `${API_URL}${participant.profile.profilePicture}` : `${API_URL}/uploads/broker.png`} alt={participant.userDetails.name} />
            <span>{participant.userDetails.name}</span>
          </div>
        ))}
      </div>
      <div className="message-list">
        {messages.map((msg) => {
          const senderDetails = getSenderDetails(msg.sender);
          const senderName = msg.sender === userId ? 'You' : senderDetails.userDetails.name; // Check sender ID
          return (
          <div key={msg._id} className={`message`}>
            <strong>{senderName}: </strong>{msg.message}
            <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</span>
          </div>
         );
        })}
      </div>
    </div>
    <div className="message-input">
      <textarea
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type your message..."
        rows="3"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
  </div>
  );
};

export default GroupChat;
