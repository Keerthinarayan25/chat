import React from 'react';
// import useChatStore from '../services/useChatStore.js';
import Sidebar from '../components/Sidebar.jsx';
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import { useChatStore } from '../services/useChatStore.js';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='h-screen bg-gray-900 text-white'>
      <div className='flex items-center justify-center pt-20 px-4 '>
        <div className='bg-gray-800 rounded-lg shadow-cl w-full max-w-6xl   h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected/>: <ChatContainer />}

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;