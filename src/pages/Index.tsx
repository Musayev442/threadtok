
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import Post, { PostType } from '../components/feed/Post';
import Thread from '../components/feed/Thread';
import { toast } from 'sonner';

// Mock data for posts
const mockPosts: PostType[] = [
  {
    id: 1,
    user: {
      id: 1,
      username: "alex_design",
      name: "Alex Johnson",
      avatar: "https://source.unsplash.com/random/150x150/?portrait=1",
      verified: true,
    },
    content: "Just launched my new design system! Check it out and let me know what you think. Been working on this for months!",
    media: {
      type: "image",
      url: "https://source.unsplash.com/random/800x600/?design=1",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    stats: {
      likes: 147,
      comments: 32,
      reposts: 8,
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "tech_lisa",
      name: "Lisa Tech",
      avatar: "https://source.unsplash.com/random/150x150/?portrait=2",
    },
    content: "The future of AI is not replacing humans, but augmenting human capabilities. What do you think? Will AI replace certain jobs or create new opportunities?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    stats: {
      likes: 89,
      comments: 54,
      reposts: 12,
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      username: "maria",
      name: "Maria Rodriguez",
      avatar: "https://source.unsplash.com/random/150x150/?portrait=3",
      verified: true,
    },
    content: "Checkout my latest video on sustainable fashion! 🌿 #SustainableFashion #EcoFriendly",
    media: {
      type: "video",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    stats: {
      likes: 423,
      comments: 86,
      reposts: 42,
    },
  },
];

// Mock thread with replies
const mockThread = {
  mainPost: {
    id: 4,
    user: {
      id: 4,
      username: "chris.codes",
      name: "Chris Developer",
      avatar: "https://source.unsplash.com/random/150x150/?portrait=4",
      verified: true,
    },
    content: "What's your favorite programming language in 2023 and why? I'm still a big fan of TypeScript but curious what everyone else is enjoying these days.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    stats: {
      likes: 215,
      comments: 118,
      reposts: 26,
    },
  },
  replies: [
    {
      id: 5,
      user: {
        id: 5,
        username: "dev.ninja",
        name: "Dev Ninja",
        avatar: "https://source.unsplash.com/random/150x150/?portrait=5",
      },
      content: "Rust has been incredible for performance-critical applications. The learning curve is steep but worth it!",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
      stats: {
        likes: 43,
        comments: 5,
        reposts: 2,
      },
    },
    {
      id: 6,
      user: {
        id: 6,
        username: "sarah_j",
        name: "Sarah Johnson",
        avatar: "https://source.unsplash.com/random/150x150/?portrait=6",
      },
      content: "Python for me - versatility is key and the ecosystem for data science is unmatched.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      stats: {
        likes: 38,
        comments: 7,
        reposts: 1,
      },
    },
  ],
};

const Index = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    const loadPosts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts([...mockPosts]);
      setLoading(false);
      toast("Feed updated", {
        description: "Latest threads have been loaded",
      });
    };

    loadPosts();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200;
    
    if (bottom && !loading) {
      // Load more posts when reaching near bottom
      // This would normally fetch more posts from an API
      console.log("Load more posts");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-threadtok-background text-white">
      <Navbar />
      
      <main 
        className="flex-1 max-w-screen-md w-full mx-auto pb-16 overflow-y-auto" 
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-t-2 border-threadtok-accent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Loading threads...</p>
          </div>
        ) : (
          <>
            <Thread mainPost={mockThread.mainPost} replies={mockThread.replies} />
            
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}

            <div className="py-6 text-center text-gray-500 text-sm">
              You've reached the end of your feed
            </div>
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
