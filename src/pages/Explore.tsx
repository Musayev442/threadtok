
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { Search, TrendingUp, Filter, Users, VideoIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/ui/UserAvatar';
import Thread from '@/components/feed/Thread';
import { PostType } from '@/components/feed/Post';

// Mock data for the explore page
const trendingTopics = [
  { id: 1, name: "AI Generated Art", postCount: 2453 },
  { id: 2, name: "React 19 Release", postCount: 1872 },
  { id: 3, name: "Remote Work", postCount: 1543 },
  { id: 4, name: "Web Development", postCount: 1325 },
  { id: 5, name: "Tailwind CSS", postCount: 1122 },
  { id: 6, name: "Machine Learning", postCount: 987 },
];

const discoverUsers = [
  { id: 1, username: "react_ninja", fullName: "Alex Chen", followers: 12500, avatar: "https://source.unsplash.com/random/150x150/?portrait-1" },
  { id: 2, username: "design_master", fullName: "Sofia Rodriguez", followers: 9800, avatar: "https://source.unsplash.com/random/150x150/?portrait-2" },
  { id: 3, username: "code.with.james", fullName: "James Wilson", followers: 8700, avatar: "https://source.unsplash.com/random/150x150/?portrait-3" },
  { id: 4, username: "ui_sarah", fullName: "Sarah Johnson", followers: 7400, avatar: "https://source.unsplash.com/random/150x150/?portrait-4" },
  { id: 5, username: "tech_maria", fullName: "Maria Garcia", followers: 6300, avatar: "https://source.unsplash.com/random/150x150/?portrait-5" },
];

// Mock thread data
const mockTopThreads: { mainPost: PostType; replies: PostType[] }[] = [
  {
    mainPost: {
      id: "t1",
      user: {
        username: "jack_designer",
        name: "Jack Wilson",
        avatar: "https://source.unsplash.com/random/150x150/?portrait-6"
      },
      content: "Just released a new UI kit for social media apps with dark mode support. What do you think?",
      media: "https://source.unsplash.com/random/600x400/?ui-design",
      createdAt: "2h",
      likes: 482,
      comments: 56,
      reposts: 32
    },
    replies: []
  },
  {
    mainPost: {
      id: "t2",
      user: {
        username: "sarah_dev",
        name: "Sarah Martinez",
        avatar: "https://source.unsplash.com/random/150x150/?portrait-7"
      },
      content: "The future of frontend is here. Started learning the new React 19 features and I'm blown away!",
      createdAt: "3h",
      likes: 327,
      comments: 42,
      reposts: 21
    },
    replies: []
  }
];

const mockVideoReplies: PostType[] = [
  {
    id: "v1",
    user: {
      username: "tech_tutorials",
      name: "Tech Tutorials",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-8"
    },
    content: "Quick tutorial on how to implement infinite scroll in React",
    media: "https://source.unsplash.com/random/600x400/?coding",
    mediaType: "video",
    createdAt: "5h",
    likes: 723,
    comments: 94,
    reposts: 57
  },
  {
    id: "v2",
    user: {
      username: "design_daily",
      name: "Design Daily",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-9"
    },
    content: "How to create a glass morphism effect with Tailwind CSS",
    media: "https://source.unsplash.com/random/600x400/?design",
    mediaType: "video",
    createdAt: "7h",
    likes: 518,
    comments: 63,
    reposts: 38
  }
];

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Threads', 'Users', 'Videos', 'Images'];

  return (
    <div className="flex flex-col min-h-screen bg-threadtok-background text-white">
      <Navbar />
      
      <main className="flex-1 w-full max-w-screen-md mx-auto px-4 pb-16">
        {/* Search and filter */}
        <div className="sticky top-[72px] z-30 pt-4 pb-2 backdrop-blur-lg bg-threadtok-background/80">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-threadtok-accent" />
            </div>
            <input
              type="text"
              placeholder="Search threads, topics, users..."
              className="w-full pl-10 pr-4 py-2 bg-threadtok-card border border-threadtok-border rounded-lg focus:ring-1 focus:ring-threadtok-accent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <ScrollArea className="w-full">
            <div className="flex space-x-2 pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-app ${
                    activeFilter === filter
                      ? 'bg-threadtok-accent text-white'
                      : 'bg-threadtok-card text-gray-300 hover:bg-threadtok-muted'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Trending topics */}
        <section className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-threadtok-accent" />
              Trending Topics
            </h2>
            <button className="p-1.5 rounded-full hover:bg-threadtok-muted transition-app">
              <Filter className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {trendingTopics.map((topic) => (
              <div 
                key={topic.id}
                className="glass-card rounded-xl p-3 hover:bg-threadtok-muted/30 transition-app cursor-pointer"
              >
                <p className="font-semibold text-white mb-1">#{topic.name}</p>
                <p className="text-xs text-gray-400">{topic.postCount.toLocaleString()} posts</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Top threads */}
        <section className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Threads</h2>
            <button className="text-xs text-threadtok-accent">See All</button>
          </div>
          
          <div className="space-y-4">
            {mockTopThreads.map((thread) => (
              <Thread key={thread.mainPost.id} mainPost={thread.mainPost} replies={thread.replies} />
            ))}
          </div>
        </section>
        
        {/* Video replies */}
        <section className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <VideoIcon className="h-5 w-5 mr-2 text-threadtok-accent" />
              Most Engaged Video Replies
            </h2>
            <button className="text-xs text-threadtok-accent">See All</button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {mockVideoReplies.map((video) => (
              <div 
                key={video.id}
                className="glass-card rounded-xl p-4 hover:bg-threadtok-card/90 transition-app cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <UserAvatar src={video.user.avatar} alt={video.user.name} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{video.user.name}</h3>
                      <span className="text-xs text-gray-400">{video.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">@{video.user.username}</p>
                    <p className="mb-3">{video.content}</p>
                    
                    <div 
                      className="w-full h-48 rounded-lg bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${video.media})` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 p-3 rounded-full">
                          <VideoIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3 text-gray-400 text-sm space-x-4">
                      <span>{video.likes} likes</span>
                      <span>{video.comments} comments</span>
                      <span>{video.reposts} reposts</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Discover users */}
        <section className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 mr-2 text-threadtok-accent" />
              Discover New Users
            </h2>
            <button className="text-xs text-threadtok-accent">See All</button>
          </div>
          
          <div className="space-y-3">
            {discoverUsers.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-threadtok-muted transition-app cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <UserAvatar src={user.avatar} alt={user.fullName} size="md" />
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-3">{user.followers.toLocaleString()} followers</span>
                  <button className="px-3 py-1 bg-threadtok-accent rounded-full text-sm font-medium hover:bg-threadtok-accent/80 transition-app">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNav activePage="explore" />
    </div>
  );
};

export default Explore;
