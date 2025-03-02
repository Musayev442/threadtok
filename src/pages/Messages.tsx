import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Mic, Image, Send, ArrowLeft, 
  MoreVertical, Phone, Video, Check, CheckCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/layout/BottomNav';
import ChatMessage from '@/components/messages/ChatMessage';
import ConversationItem from '@/components/messages/ConversationItem';
import { useToast } from '@/hooks/use-toast';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hey, how are you doing?',
    timestamp: 'Just now',
    unread: 3,
    online: true
  },
  {
    id: '2',
    name: 'Morgan Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Did you see the new post?',
    timestamp: '10m ago',
    unread: 0,
    online: true
  },
  {
    id: '3',
    name: 'Taylor Ross',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Sent you a photo',
    timestamp: '1h ago',
    unread: 1,
    online: false
  },
  {
    id: '4',
    name: 'Jamie Wilson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastMessage: 'Let\'s meet tomorrow!',
    timestamp: '2h ago',
    unread: 0,
    online: false
  },
  {
    id: '5',
    name: 'Casey Brooks',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Yesterday',
    unread: 0,
    online: true
  },
  {
    id: '6',
    name: 'Riley Green',
    avatar: 'https://i.pravatar.cc/150?img=6',
    lastMessage: 'Voice message (0:34)',
    timestamp: 'Yesterday',
    unread: 0,
    online: false
  },
  {
    id: '7',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/150?img=7',
    lastMessage: 'Can you share that link again?',
    timestamp: '2 days ago',
    unread: 0,
    online: true
  },
  {
    id: '8',
    name: 'Quinn Taylor',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'See you at the event!',
    timestamp: '3 days ago',
    unread: 0,
    online: false
  }
];

// Define the Message type to match the ChatMessage component's expected props
interface Message {
  id: string;
  senderId: string;
  text?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'voice';
  imageUrl?: string;
  duration?: string;
}

// Mock data for chat messages
const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'user',
    text: 'Hey, how are you doing?',
    timestamp: '10:03 AM',
    status: 'read'
  },
  {
    id: 'm2',
    senderId: '1',
    text: 'I\'m doing great! Just finished that project we talked about.',
    timestamp: '10:04 AM',
    status: 'sent'
  },
  {
    id: 'm3',
    senderId: 'user',
    text: 'That sounds awesome! Can you share some photos?',
    timestamp: '10:05 AM',
    status: 'read'
  },
  {
    id: 'm4',
    senderId: '1',
    text: 'Sure, here you go!',
    timestamp: '10:06 AM',
    status: 'sent'
  },
  {
    id: 'm5',
    senderId: '1',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    timestamp: '10:06 AM',
    status: 'sent'
  },
  {
    id: 'm6',
    senderId: 'user',
    text: 'Wow, that looks amazing! Great work!',
    timestamp: '10:07 AM',
    status: 'sent'
  },
  {
    id: 'm7',
    senderId: '1',
    text: 'Thanks! I put a lot of effort into it.',
    timestamp: '10:08 AM',
    status: 'sent'
  },
  {
    id: 'm8',
    senderId: 'user',
    type: 'voice',
    duration: '0:12',
    timestamp: '10:09 AM',
    status: 'sent'
  },
  {
    id: 'm9',
    senderId: '1',
    text: 'Got your voice message. Let\'s catch up later today!',
    timestamp: '10:10 AM',
    status: 'sent'
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const chatInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeConversation = mockConversations.find(conv => conv.id === activeChat);

  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup recording timer on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!messageText.trim() && !isRecording) return;

    if (isRecording) {
      // Handle voice message
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      const newMessage: Message = {
        id: `m${messages.length + 1}`,
        senderId: 'user',
        type: 'voice',
        duration: `0:${recordingTime < 10 ? '0' + recordingTime : recordingTime}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      setMessages([...messages, newMessage]);
      setRecordingTime(0);
      
      toast({
        title: "Voice message sent",
        description: `Voice message sent (${newMessage.duration})`,
      });
    } else {
      // Handle text message
      const newMessage: Message = {
        id: `m${messages.length + 1}`,
        senderId: 'user',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer for recording duration
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setRecordingTime(0);
  };

  const handleSendImage = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to send images will be available in a future update.",
    });
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className="flex flex-col h-screen bg-threadtok-background text-white">
      {!activeChat ? (
        // Conversations list view
        <>
          <header className="sticky top-0 z-30 p-4 bg-threadtok-background border-b border-threadtok-border bg-opacity-90 backdrop-blur-md">
            <h1 className="text-2xl font-bold mb-3">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full bg-threadtok-card border border-threadtok-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-threadtok-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <div className="divide-y divide-threadtok-border animate-fade-in">
                {filteredConversations.map((conversation) => (
                  <ConversationItem 
                    key={conversation.id}
                    conversation={conversation}
                    onClick={() => setActiveChat(conversation.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <p className="text-muted-foreground mb-2">No conversations found</p>
                <p className="text-sm text-muted-foreground">Try a different search term</p>
              </div>
            )}
          </div>

          <BottomNav activePage="messages" />
        </>
      ) : (
        // Chat view
        <>
          <header className="sticky top-0 z-30 py-2 px-4 bg-threadtok-background border-b border-threadtok-border bg-opacity-90 backdrop-blur-md">
            <div className="flex items-center">
              <button 
                onClick={() => setActiveChat(null)}
                className="p-1 mr-2 rounded-full hover:bg-threadtok-muted transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex flex-1 items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={activeConversation?.avatar} />
                  <AvatarFallback>{activeConversation?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{activeConversation?.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {activeConversation?.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-threadtok-muted transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-threadtok-muted transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-threadtok-muted transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isFromUser={message.senderId === 'user'} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-threadtok-border bg-threadtok-background">
            {isRecording ? (
              <div className="flex items-center bg-threadtok-card rounded-full px-4 py-2">
                <div className="flex-1 flex items-center">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                  <span className="text-sm">Recording... {formatRecordingTime(recordingTime)}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleCancelRecording}
                    className="p-2 text-red-500 hover:bg-threadtok-muted rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    className="p-2 text-threadtok-accent hover:bg-threadtok-muted rounded-full transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center bg-threadtok-card rounded-full px-4">
                <button 
                  onClick={handleSendImage}
                  className="p-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <Image size={20} />
                </button>
                <input
                  ref={chatInputRef}
                  type="text"
                  placeholder="Message..."
                  className="flex-1 bg-transparent border-0 py-3 focus:outline-none text-sm"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                {messageText.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 text-threadtok-accent hover:bg-threadtok-muted rounded-full transition-colors"
                  >
                    <Send size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="p-2 text-muted-foreground hover:text-white transition-colors"
                  >
                    <Mic size={20} />
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
