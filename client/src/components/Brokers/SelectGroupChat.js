import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useHistory from react-router-dom
import axiosInstance from '../Auth/AxiosInstance'; // Assuming AxiosInstance is set up for authenticated requests
import { jwtDecode as jwt_decode } from 'jwt-decode'; // if you want to keep calling it jwt_decode
import '../BuyersSellers/styles/ProfilesDisplay.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const SelectGroupChat = () => {

  const [groupChats, setGroupChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const {roomNumber} = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const brokerId = localStorage.getItem('userId'); // Make sure this key matches where you store the user ID

  const loc_groupChat = location.state?.groupChat || "";
  const loc_profilesToAdd = location.state?.profilesToAdd || [];

  useEffect(() => {
    if (loc_groupChat)
    {
        setSelectedChat(loc_groupChat);
    }
    
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/groupchat/groups`);
      setGroupChats(response.data); // Set messages to state
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchGroups(); // Initial fetch
  }, []); // Run effect when groupId changes

  const submitChoice = (groupChat) => {
    setSelectedChat(groupChat);
    navigate(`/add-room/${roomNumber}`, { state: { groupChat: groupChat, profilesToAdd: loc_profilesToAdd } });
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <button className='back-button' onClick={() => navigate(`/add-room/${roomNumber}`, {state: {groupChat: selectedChat, profilesToAdd: loc_profilesToAdd}})}>Back</button>

        <div className="group-chats-grid">

    {groupChats.map((chat) => {
        const hasMatchingProfile = chat.participants.some(participant => 
          loc_profilesToAdd.some(profile => profile === participant.userId)
        );

        if (hasMatchingProfile) {
          return (  <div key={chat.chatId} className="group-chat-card">
                <div className="participants-pictures">
                {chat.participants.map((participant) => {
                    return (
                    <img 
                      key={participant.userId} 
                      src={participant.profile.profilePicture ? `${API_URL}${participant.profile.profilePicture}` : `${API_URL}/uploads/broker.png`}
                      alt={`${participant.name}'s profile`} 
                      className="participant-picture"
                    />
                  );
                })}
                
            
                </div>
                <div className="group-chat-info">
                    <p><strong>Participants:</strong> {
                        
                        chat.participants.map(p => {
                          return p.userId === brokerId ? 'You' : p.userDetails.name;
                        }).join(', ') // Join the array of names into a string
                        }
                        
                    </p>

                </div>
                {selectedChat === chat.chatId ? (<button className="view-group-button" style={{backgroundColor: 'red'}}>
                      Selected
                  </button> ) : (<button 
                  className="view-group-button" 
                  onClick={() => submitChoice(chat.chatId)}
                >
                  Choose Group
                </button>
                )}
              </div>



          )}})}

          

        </div>

        <div>

                <button 
                            className="view-group-button" 
                            style={{backgroundColor: 'green'}}
                            onClick={() => navigate(`/${roomNumber}/select-chat-profiles`, {state: {groupChat: loc_groupChat, profilesToAdd: loc_profilesToAdd}})}
                          >
                            Create New Group Chat

                          </button>
          </div>
    
    </div>
    
  );
};

export default SelectGroupChat;
