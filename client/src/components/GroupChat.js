// components/GroupChat.js

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './Auth/AxiosInstance';
import './styles/GroupChat.css';

const API_URL = process.env.REACT_APP_API_URL; // Your API base URL

const GroupChat = ({ groupChatId }) => {
  const params = useParams();
  const groupId = groupChatId || params.groupId;
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const fetchGroupData = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/groupchat/group/${groupId}`);
      setParticipants(response.data.participants);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [groupId]);

  const sendMessage = async () => {
    if (!messageContent.trim() && !selectedFile) return;

    const formData = new FormData();

    formData.append('message', messageContent.trim());

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {

      await axiosInstance.post(`${API_URL}/api/groupchat/${groupId}/message`, formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      });

      setMessageContent('');
      setSelectedFile(null);
      fetchGroupData();
    } catch (error) {
      console.error('Error sending message:', error);
    }
};

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const getSenderDetails = (senderId) => {
    const sender = participants.find((participant) => participant.userId === senderId);
    return sender;
  };

  return (
    <div className="group-chat">
      <div className="chat-container">
        <div className="participants">
          {participants.map((participant) => (
            <div key={participant.userId} className="participant">
              <img
                src={participant.profile.profilePicture ? `${API_URL}${participant.profile.profilePicture}` : `${API_URL}/uploads/broker.png`}
                alt={participant.userDetails.name}
              />
              <span>{participant.userDetails.name}</span>
            </div>
          ))}
        </div>
        <div className="message-list">
          {messages.map((msg) => {
            const senderDetails = getSenderDetails(msg.sender);
            const senderName = msg.sender === userId ? 'You' : senderDetails.userDetails.name;
            return (
              <div key={msg._id} className="message">
                <strong>{senderName}: </strong>
                  {msg.message}
                  {msg.filename && (<div>
                    
                    <br/>
                     <a href={`${API_URL}/${msg.path}`} target="_blank" rel="noopener noreferrer">
                    {msg.filename}
                  </a>
                  
                  </div>
                )}
                 
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
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={sendMessage}>Send</button>
      </div>
      

    </div>
  );
};

export default GroupChat;
