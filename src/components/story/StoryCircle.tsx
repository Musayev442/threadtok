
import React from 'react';
import { cn } from "@/lib/utils";
import UserAvatar from '../ui/UserAvatar';

interface StoryCircleProps {
  username: string;
  avatarSrc?: string;
  viewed?: boolean;
  className?: string;
  isCurrentUser?: boolean;
  onClick?: () => void;
}

const StoryCircle: React.FC<StoryCircleProps> = ({
  username,
  avatarSrc,
  viewed = false,
  className,
  isCurrentUser = false,
  onClick
}) => {
  return (
    <div 
      className={cn("flex flex-col items-center gap-1 px-1", className)}
      onClick={onClick}
    >
      <div className={cn(
        "p-0.5 rounded-full transition-transform duration-200 hover:scale-105",
        viewed 
          ? "bg-threadtok-muted" 
          : "bg-gradient-to-tr from-threadtok-accent to-purple-500",
        isCurrentUser && "from-blue-500 to-indigo-600"
      )}>
        <UserAvatar 
          src={avatarSrc} 
          alt={username} 
          size="md" 
          className="cursor-pointer"
        />
      </div>
      <span className="text-xs text-gray-300 truncate max-w-[60px]">
        {isCurrentUser ? "Your story" : username}
      </span>
    </div>
  );
};

export default StoryCircle;
