import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, Grid, List, MessageCircle, MoreHorizontal, UserPlus } from 'lucide-react';
import UserAvatar from '../components/ui/UserAvatar';
import Post, { PostType } from '../components/feed/Post';

// Mock user data
const mockUser = {
  username: 'alex_design',
  name: 'Alex Johnson',
  bio: 'Digital designer & photographer. Creating visual stories through pixels and perspective. Based in San Francisco 📍',
  avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  followers: 5280,
  following: 420,
  verified: true,
  isOwnProfile: false
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

const Profile = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('posts');
  
  return (
    <div className="min-h-screen bg-threadtok-background pb-16">
      <Navbar hideStories={true} />
      
      <main className="max-w-screen-md mx-auto px-4">
        {/* Profile Header */}
        <div className="py-6">
          <div className="flex items-start justify-between mb-4">
            <UserAvatar 
              src={mockUser.avatar} 
              alt={mockUser.name} 
              size="xl" 
              className="border-2 border-threadtok-accent"
            />
            
            <div className="flex items-center gap-2">
              {mockUser.isOwnProfile ? (
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <Button size="sm" className="bg-threadtok-accent hover:bg-threadtok-accent/90 flex items-center gap-1">
                  <UserPlus className="w-4 h-4" />
                  Follow
                </Button>
              )}
              
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <h1 className="text-xl font-bold mb-1">{mockUser.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <span>@{mockUser.username}</span>
            {mockUser.verified && (
              <svg className="h-4 w-4 text-threadtok-accent fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </div>
          
          <p className="text-white/90 mb-4">{mockUser.bio}</p>
          
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-semibold">{mockUser.following.toLocaleString()}</span>
              <span className="text-gray-400 ml-1">Following</span>
            </div>
            <div>
              <span className="font-semibold">{mockUser.followers.toLocaleString()}</span>
              <span className="text-gray-400 ml-1">Followers</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-2">
            <TabsList className="bg-threadtok-muted">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${viewMode === 'grid' ? 'text-threadtok-accent' : 'text-gray-400'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${viewMode === 'list' ? 'text-threadtok-accent' : 'text-gray-400'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="posts">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-1">
                {mockPosts.map(post => (
                  <div key={post.id} className="aspect-square bg-threadtok-muted rounded-md overflow-hidden">
                    {post.media && (
                      post.media.type === 'image' ? (
                        <img src={post.media.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="relative w-full h-full bg-threadtok-card flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-threadtok-accent" />
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mockPosts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="liked">
            <div className="text-center py-8 text-gray-400">
              No liked posts yet
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="text-center py-8 text-gray-400">
              No saved posts yet
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNav activePage="profile" />
    </div>
  );
};

export default Profile;
