
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ChatMessageProps {
  message: Message;
  isFromUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isFromUser }) => {
  const StatusIcon = () => {
    if (message.status === 'read') return <CheckCheck size={14} className="text-threadtok-accent" />;
    if (message.status === 'delivered') return <CheckCheck size={14} className="text-muted-foreground" />;
    return <Check size={14} className="text-muted-foreground" />;
  };

  if (message.type === 'image') {
    return (
      <div className={cn(
        "flex mb-3",
        isFromUser ? "justify-end" : "justify-start"
      )}>
        <div className={cn(
          "max-w-[75%] rounded-2xl overflow-hidden",
          isFromUser ? "bg-threadtok-accent rounded-tr-none" : "bg-threadtok-card rounded-tl-none",
        )}>
          <img 
            src={message.imageUrl} 
            alt="Shared image" 
            className="w-full h-auto rounded object-cover"
          />
          <div className="px-3 py-1 flex justify-between items-center">
            <span className="text-xs opacity-70">{message.timestamp}</span>
            {isFromUser && <StatusIcon />}
          </div>
        </div>
      </div>
    );
  } 
  
  if (message.type === 'voice') {
    return (
      <div className={cn(
        "flex mb-3",
        isFromUser ? "justify-end" : "justify-start"
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl flex items-center space-x-3",
          isFromUser ? 
            "bg-threadtok-accent rounded-tr-none text-white" : 
            "bg-threadtok-card rounded-tl-none"
        )}>
          <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <div className="flex-1">
            <div className="w-full">
              <div className="w-24 h-1 bg-white/30 rounded-full">
                <div className="w-1/3 h-full bg-white rounded-full" />
              </div>
            </div>
            <div className="text-xs mt-1">{message.duration}</div>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <span>{message.timestamp}</span>
            {isFromUser && <StatusIcon />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex mb-3",
      isFromUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "px-4 py-2.5 rounded-2xl max-w-[75%]",
        isFromUser ? 
          "bg-threadtok-accent rounded-tr-none text-white" : 
          "bg-threadtok-card rounded-tl-none"
      )}>
        <div className="mb-1">{message.text}</div>
        <div className="flex justify-end items-center space-x-1 text-xs">
          <span>{message.timestamp}</span>
          {isFromUser && <StatusIcon />}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
