
import { useChatStore } from '../services/useChatStore';


const ChatHeader = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-12 w-full bg-gray-800 border-b border-gray-700 px-4 flex items-center gap-3 text-white font-semibold '>
          {/* Avatar */}
          <div className='h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center'>
            {selectedUser.name.charAt(0).toUpperCase()} 
          </div>
          <p className='text-md font-medium items-center justify-center px-3'>{selectedUser.name}</p>
        
    </div>
  )
}
export default ChatHeader;