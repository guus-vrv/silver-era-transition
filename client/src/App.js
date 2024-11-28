// src/App.js
import React, {useState, useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Auth/Register';
import './index.css';
import Login from './components/Auth/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EditProfile from './components/BuyersSellers/EditProfile';
import Settings from './components/Settings';
import SavedProfiles from './components/BuyersSellers/SavedProfiles';
import SkippedProfiles from './components/BuyersSellers/SkippedProfiles';
import DiscoverProfile from './components/BuyersSellers/DiscoverProfile';
import Inbox from './components/Inbox';
import GroupChat from './components/GroupChat';
import Room from './components/Brokers/Room';
import AddRoom from './components/Brokers/AddRoom';
import './components/styles/styles.css';
import Filters from './components/BuyersSellers/Filters';
import SelectProfiles from './components/Brokers/SelectProfiles';
import SelectChatProfiles from './components/Brokers/SelectChatProfiles';
import SelectGroupChat from './components/Brokers/SelectGroupChat';
import LandingPage from './components/LandingPage';

const App = () => {

  const [role, setRole] = useState(null);

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Update the state with the role
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />, // This will trigger the redirect
      errorElement: <div>Error occurred</div>,
    }, 
    { 
      path: "/room/:roomNumber",
      element:(< Layout >
        <Room />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <div>Error occurred</div>,
    },
  
    {
      path: "/dashboard",
      element: (< Layout >
         <Dashboard />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },

    {
      path: "/discover",
      element: (< Layout >
        <DiscoverProfile/>
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },

    {
      path: "/saved",
      element: (< Layout >
        <SavedProfiles />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/inbox",
      element: (< Layout >
        <Inbox />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/skipped",
      element: (< Layout >
        <SkippedProfiles />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },

    {
      path: "/edit-profile",
      element: (< Layout >
        <EditProfile />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/settings",
      element: (< Layout >
        <Settings />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },

    {
      path: "/group-chat/:groupId",
      element: (< Layout >
        <GroupChat />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },

    {
      path: "/add-room/:roomNumber",
      element: (< Layout >
        <AddRoom />
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },

    {
      path: "/filters",
      element: (< Layout >
        <Filters/>
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/:roomNumber/select-profiles",
      element: (< Layout >
        <SelectProfiles/>
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/:roomNumber/select-chat-profiles",
      element: (< Layout >
        <SelectChatProfiles/>
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },
    {
      path: "/:roomNumber/select-groupchat",
      element: (< Layout >
        <SelectGroupChat/>
      </Layout>),
      errorElement: <div>Error occurred</div>,
    },


  
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
