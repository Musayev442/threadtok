
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  likes?: number;
  comments?: number;
  reposts?: number;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
  className?: string;
}

const PostActions: React.FC<PostActionsProps> = ({
  likes = 0,
  comments = 0,
  reposts = 0,
  onLike,
  onComment,
  onRepost,
  onShare,
  className
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike?.();
  };

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5">
        <button 
          onClick={handleLike}
          className="flex items-center gap-1 group"
        >
          <Heart 
            className={cn(
              "h-5 w-5 transition-all duration-300 group-hover:scale-110",
              isLiked ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-400"
            )} 
          />
          {likeCount > 0 && <span className={cn("text-xs", isLiked ? "text-red-500" : "text-gray-400")}>{likeCount}</span>}
        </button>
        
        <button 
          onClick={onComment}
          className="flex items-center gap-1 group"
        >
          <MessageCircle className="h-5 w-5 text-gray-400 group-hover:text-threadtok-accent transition-all duration-300 group-hover:scale-110" />
          {comments > 0 && <span className="text-xs text-gray-400">{comments}</span>}
        </button>
        
        <button 
          onClick={onRepost}
          className="flex items-center gap-1 group"
        >
          <Repeat2 className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-all duration-300 group-hover:scale-110" />
          {reposts > 0 && <span className="text-xs text-gray-400">{reposts}</span>}
        </button>
      </div>
      
      <button 
        onClick={onShare}
        className="group"
      >
        <Send className="h-5 w-5 text-gray-400 group-hover:text-threadtok-accent transition-all duration-300 group-hover:scale-110" />
      </button>
    </div>
  );
};

export default PostActions;
