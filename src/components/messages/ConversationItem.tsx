
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, onClick }) => {
  return (
    <div 
      className="flex items-center p-4 hover:bg-threadtok-card/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="relative mr-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.online && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-threadtok-background" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium truncate mr-2">{conversation.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
      </div>
      
      {conversation.unread > 0 && (
        <div className="ml-3">
          <span className="flex items-center justify-center h-5 w-5 bg-threadtok-accent text-white text-xs rounded-full">
            {conversation.unread}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
