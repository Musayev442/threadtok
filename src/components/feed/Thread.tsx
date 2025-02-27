
import React from 'react';
import Post, { PostType } from './Post';
import { cn } from '@/lib/utils';

interface ThreadProps {
  mainPost: PostType;
  replies?: PostType[];
  className?: string;
}

const Thread: React.FC<ThreadProps> = ({ mainPost, replies = [], className }) => {
  return (
    <div className={cn("border-b border-threadtok-border", className)}>
      <Post post={mainPost} />
      
      {replies.length > 0 && (
        <div className="ml-12 border-l border-threadtok-border pl-3">
          {replies.map((reply) => (
            <Post 
              key={reply.id} 
              post={{ ...reply, isReply: true }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;
