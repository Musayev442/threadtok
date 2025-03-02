
import React, { useState } from 'react';
import { Heart, Grid, List, Edit, UserPlus, Check, Bookmark } from 'lucide-react';
import UserAvatar from '@/components/ui/UserAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Post, { PostType } from '@/components/feed/Post';
import Thread from '@/components/feed/Thread';

// Mock user profile data
const profileData = {
  id: 1,
  username: 'alexjohnson',
  name: 'Alex Johnson',
  bio: 'Digital creator | Photography enthusiast | Travel lover\nExploring the world one click at a time ✨',
  avatar: 'https://source.unsplash.com/random/200x200/?portrait',
  verified: true,
  followers: 2547,
  following: 584,
  posts: 142,
  isFollowing: false
};

// Mock posts data
const mockPosts: PostType[] = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'alexjohnson',
      name: 'Alex Johnson',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true
    },
    content: 'Just finished this amazing photo shoot in downtown! What do you think?',
    media: {
      type: 'image',
      url: 'https://source.unsplash.com/random/800x800/?photography'
    },
    createdAt: new Date('2023-09-15T10:30:00'),
    stats: {
      likes: 412,
      comments: 28,
      reposts: 12
    }
  },
  {
    id: 2,
    user: {
      id: 1,
      username: 'alexjohnson',
      name: 'Alex Johnson',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true
    },
    content: 'Morning coffee and code. Perfect start to any day. #devlife #coding',
    createdAt: new Date('2023-09-12T08:15:00'),
    stats: {
      likes: 254,
      comments: 15,
      reposts: 5
    }
  },
  {
    id: 3,
    user: {
      id: 1,
      username: 'alexjohnson',
      name: 'Alex Johnson',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true
    },
    content: 'Check out this timelapse I made of the sunset yesterday!',
    media: {
      type: 'video',
      url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
    },
    createdAt: new Date('2023-09-10T18:45:00'),
    stats: {
      likes: 876,
      comments: 52,
      reposts: 31
    }
  },
  {
    id: 4,
    user: {
      id: 1,
      username: 'alexjohnson',
      name: 'Alex Johnson',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true
    },
    content: 'Working on some new mobile UI designs. Simplicity is key.',
    media: {
      type: 'image',
      url: 'https://source.unsplash.com/random/800x800/?design'
    },
    createdAt: new Date('2023-09-08T14:20:00'),
    stats: {
      likes: 693,
      comments: 41,
      reposts: 18
    }
  }
];

// Mock liked posts data - a subset of the posts for this example
const likedPosts = mockPosts.slice(0, 2);
// Mock saved posts data - a subset of the posts for this example
const savedPosts = mockPosts.slice(2);

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(profileData);
  const [isGridView, setIsGridView] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  const handleFollow = () => {
    setProfile(prev => ({ 
      ...prev, 
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };
  
  const formatCount = (count: number): string => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
  };

  return (
    <div className="min-h-screen bg-threadtok-background text-white animate-fade-in">
      {/* Profile Header */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="relative mb-6">
          {/* Cover Photo Placeholder */}
          <div className="h-40 bg-gradient-to-r from-threadtok-card to-threadtok-muted rounded-xl overflow-hidden">
            <div className="w-full h-full bg-threadtok-card opacity-50"></div>
          </div>
          
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 px-4">
            <UserAvatar 
              src={profile.avatar} 
              alt={profile.name} 
              size="xl"
              className="ring-4 ring-threadtok-background"
            />
            
            <div className="mt-4 md:mt-0 md:ml-6 md:mb-2 flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    {profile.verified && (
                      <svg className="h-5 w-5 text-threadtok-accent fill-current" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-gray-400">@{profile.username}</p>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button 
                    onClick={handleFollow}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-app ${
                      profile.isFollowing 
                        ? 'bg-threadtok-secondary text-white' 
                        : 'bg-threadtok-accent text-white'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {profile.isFollowing ? <Check size={16} /> : <UserPlus size={16} />}
                      {profile.isFollowing ? 'Following' : 'Follow'}
                    </span>
                  </button>
                  
                  <button 
                    className="px-4 py-2 rounded-full bg-threadtok-secondary text-white text-sm font-medium transition-app hover:bg-threadtok-muted"
                  >
                    <span className="flex items-center gap-1">
                      <Edit size={16} />
                      Edit Profile
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-4 px-4">
            <p className="text-white whitespace-pre-line">{profile.bio}</p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6 mt-6 px-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold">{formatCount(profile.posts)}</span>
              <span className="text-gray-400">Posts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">{formatCount(profile.followers)}</span>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">{formatCount(profile.following)}</span>
              <span className="text-gray-400">Following</span>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="mt-6" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between border-b border-threadtok-border pb-2">
            <TabsList className="bg-transparent">
              <TabsTrigger 
                value="posts" 
                className="data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-threadtok-accent"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger 
                value="liked" 
                className="data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-threadtok-accent"
              >
                <Heart size={16} className="mr-1" /> Liked
              </TabsTrigger>
              <TabsTrigger 
                value="saved" 
                className="data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-threadtok-accent"
              >
                <Bookmark size={16} className="mr-1" /> Saved
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-1">
              <button 
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded transition-app ${isGridView ? 'bg-threadtok-secondary' : 'hover:bg-threadtok-card'}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded transition-app ${!isGridView ? 'bg-threadtok-secondary' : 'hover:bg-threadtok-card'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          <TabsContent value="posts" className="mt-4">
            {isGridView ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {mockPosts.map(post => (
                  <PostGridItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {mockPosts.map(post => (
                  <Thread key={post.id} mainPost={post} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="liked" className="mt-4">
            {isGridView ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {likedPosts.map(post => (
                  <PostGridItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {likedPosts.map(post => (
                  <Thread key={post.id} mainPost={post} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            {isGridView ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {savedPosts.map(post => (
                  <PostGridItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {savedPosts.map(post => (
                  <Thread key={post.id} mainPost={post} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const PostGridItem: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden bg-threadtok-card hover:scale-[0.98] transition-app cursor-pointer group">
      {post.media ? (
        post.media.type === 'image' ? (
          <img 
            src={post.media.url} 
            alt={post.content} 
            className="w-full h-full object-cover"
          />
        ) : (
          <video 
            src={post.media.url}
            className="w-full h-full object-cover"
            poster="/placeholder.svg"
          />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center p-3 bg-threadtok-muted">
          <p className="text-white text-sm line-clamp-4 text-center">{post.content}</p>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-app">
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1">
            <Heart size={12} />
            <span>{post.stats.likes}</span>
          </div>
          <span className="text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
