// components/GroupChat.js
import React, { useEffect, useState } from 'react';
import axiosInstance from './Auth/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import GroupChat from './GroupChat';
import './styles/Inbox.css';

const API_URL = process.env.REACT_APP_API_URL; // Your API base URL

const Inbox = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState('');

  const userId = localStorage.getItem('userId'); // Make sure this key matches where you store the user ID

  // Fetch messages when the component mounts or when the groupId changes

  const fetchGroups = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/groupchat/groups`);
      setGroups(response.data); // Set messages to state
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchGroups(); // Initial fetch
  }, []); // Run effect when groupId changes

  const handleViewGroup = (groupId) => {
    navigate(`/group-chat/${groupId}`);
  };

  // Send a message to the group chat

  return (
    <div className="group-chats-grid">
    {groups.map((chat) => (
      <div key={chat.chatId} className="group-chat-card">
        <div className="participants-pictures">
          {chat.participants.map((participant) => {
            return (
            <img 
              key={participant.userId} 
              src={participant.profile.profilePicture ? `${API_URL}${participant.profile.profilePicture}` : `${API_URL}/uploads/broker.png`}
              className="participant-picture"
            />
          );
        })}
        </div>
        <button 
          className="view-group-button" 
          onClick={() => handleViewGroup(chat.chatId)}
        >
          View Group
        </button>
      </div>
    ))}
  </div>
  );
};

export default Inbox;
