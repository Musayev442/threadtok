
import React from 'react';
import { cn } from '@/lib/utils';
import UserAvatar from '../ui/UserAvatar';
import PostActions from './PostActions';
import { formatDistanceToNow } from 'date-fns';

export interface PostType {
  id: number | string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  createdAt: Date;
  stats: {
    likes: number;
    comments: number;
    reposts: number;
  };
  isReply?: boolean;
  
  // For backward compatibility with Explore.tsx
  likes?: number;
  comments?: number;
  reposts?: number;
  mediaType?: string;
}

interface PostProps {
  post: PostType;
  className?: string;
}

const Post: React.FC<PostProps> = ({ post, className }) => {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <article className={cn(
      "p-4 border-b border-threadtok-border animate-fade-in",
      !post.isReply && "hover:bg-threadtok-card/50 transition-app",
      className
    )}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <UserAvatar 
            src={post.user.avatar} 
            alt={post.user.name} 
            size="md" 
          />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white truncate">{post.user.name}</h4>
            {post.user.verified && (
              <svg className="h-4 w-4 text-threadtok-accent fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
            <span className="text-sm text-gray-400 truncate">@{post.user.username}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>
          
          <p className="text-white mb-3 whitespace-pre-line text-balance">{post.content}</p>
          
          {post.media && (
            <div className="rounded-xl overflow-hidden mb-3 bg-threadtok-muted">
              {post.media.type === 'image' ? (
                <img 
                  src={post.media.url} 
                  alt="Post media" 
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                />
              ) : (
                <video 
                  src={post.media.url} 
                  controls
                  className="w-full h-auto max-h-[500px]"
                  poster="/placeholder.svg"
                />
              )}
            </div>
          )}
          
          <PostActions 
            likes={post.stats.likes}
            comments={post.stats.comments}
            reposts={post.stats.reposts}
            className="mt-2"
          />
        </div>
      </div>
    </article>
  );
};

export default Post;
