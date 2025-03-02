import React, { useState, useRef } from 'react';
import { 
  Heart, MessageCircle, Share2, ChevronLeft, 
  Music, Volume2, VolumeX, Home, Search, PlusSquare, User
} from 'lucide-react';
import UserAvatar from '@/components/ui/UserAvatar';
import { PostType } from '@/components/feed/Post';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const exploreVideos: PostType[] = [
  {
    id: 1,
    user: {
      id: 1,
      username: "dance_master",
      name: "Sarah Johnson",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-1",
      verified: true
    },
    content: "Check out this new dance routine! #dancechallenge",
    media: {
      type: "video",
      url: "https://source.unsplash.com/random/600x900/?dance"
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    stats: {
      likes: 12482,
      comments: 356,
      reposts: 832
    }
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "tech_trends",
      name: "Alex Wong",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-2"
    },
    content: "The latest AI tech is mind-blowing! 🤯 #technology #futurism",
    media: {
      type: "video",
      url: "https://source.unsplash.com/random/600x900/?technology"
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    stats: {
      likes: 8921,
      comments: 243,
      reposts: 512
    }
  },
  {
    id: 3,
    user: {
      id: 3,
      username: "travel_addict",
      name: "Emma Rodriguez",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-3",
      verified: true
    },
    content: "Paradise found in Bali 🌴 #travelgoals #balilife",
    media: {
      type: "video",
      url: "https://source.unsplash.com/random/600x900/?bali"
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    stats: {
      likes: 15723,
      comments: 432,
      reposts: 921
    }
  },
  {
    id: 4,
    user: {
      id: 4,
      username: "fitness_guru",
      name: "Mark Chen",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-4"
    },
    content: "5-minute ab workout you can do anywhere! 💪 #fitness #quickworkout",
    media: {
      type: "video",
      url: "https://source.unsplash.com/random/600x900/?fitness"
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    stats: {
      likes: 9432,
      comments: 267,
      reposts: 412
    }
  },
  {
    id: 5,
    user: {
      id: 5,
      username: "food_lover",
      name: "Jamie Smith",
      avatar: "https://source.unsplash.com/random/150x150/?portrait-5"
    },
    content: "Homemade pasta is easier than you think! 🍝 #foodie #homecooking",
    media: {
      type: "video",
      url: "https://source.unsplash.com/random/600x900/?pasta"
    },
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    stats: {
      likes: 7821,
      comments: 198,
      reposts: 321
    }
  }
];

const Explore: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleSwipe = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (direction === 'up' && activeVideoIndex < exploreVideos.length - 1) {
      setActiveVideoIndex(activeVideoIndex + 1);
      setIsDetailsOpen(false);
    } else if (direction === 'down' && activeVideoIndex > 0) {
      setActiveVideoIndex(activeVideoIndex - 1);
      setIsDetailsOpen(false);
    } else if (direction === 'left') {
      setIsDetailsOpen(true);
    } else if (direction === 'right') {
      setIsDetailsOpen(false);
    }
  };

  React.useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setActiveVideoIndex(videoIndex);
            const video = videoRefs.current[videoIndex];
            if (video) {
              video.play().catch(err => console.log('Autoplay failed:', err));
            }
          } else {
            const video = videoRefs.current[videoIndex];
            if (video) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.6,
        root: containerRef.current
      }
    );

    const videoElements = containerRef.current.querySelectorAll('.video-container');
    videoElements.forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      id: 'home'
    },
    {
      icon: Search,
      label: 'Explore',
      path: '/explore',
      id: 'explore'
    },
    {
      icon: PlusSquare,
      label: 'Create',
      path: '/create',
      id: 'create'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      path: '/messages',
      id: 'messages'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      id: 'profile'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-threadtok-background text-white overflow-hidden">
      <main 
        ref={containerRef}
        className="flex-1 w-full h-full relative overflow-y-auto snap-y snap-mandatory"
      >
        {exploreVideos.map((video, index) => (
          <div 
            key={video.id.toString()}
            data-index={index}
            className="video-container h-screen w-full snap-start snap-always"
          >
            <div className="h-full w-full bg-threadtok-background relative">
              <video
                ref={el => videoRefs.current[index] = el}
                src={video.media?.url}
                className="h-full w-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={() => setIsMuted(!isMuted)}
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />
              
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/40 text-white"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-2">
                <div className="px-4 mb-2">
                  <div className="flex items-center mb-2">
                    <UserAvatar 
                      src={video.user.avatar} 
                      alt={video.user.name} 
                      size="sm" 
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">{video.user.username}</span>
                      {video.user.verified && (
                        <svg className="h-4 w-4 text-threadtok-accent fill-current" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                    </div>
                    <button className="ml-auto bg-threadtok-accent px-3 py-1 rounded-full text-xs font-medium">
                      Follow
                    </button>
                  </div>
                  <p className="text-sm text-white/90 mb-2">{video.content}</p>
                  <div className="flex items-center text-xs text-white/70 mb-3">
                    <Music className="h-3 w-3 mr-1" />
                    <span>Original sound - {video.user.name}</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-2">
                  <div className="flex items-center justify-between px-6">
                    {navItems.map((item) => {
                      const isActive = item.id === 'explore';
                      const IconComponent = item.icon;
                      
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          className={cn(
                            "flex flex-col items-center py-1.5 rounded-lg transition-all",
                            isActive 
                              ? "text-threadtok-accent" 
                              : "text-gray-400 hover:text-white"
                          )}
                        >
                          <IconComponent className={cn(
                            "h-6 w-6 mb-1",
                            isActive && "text-threadtok-accent"
                          )} />
                          <span className="text-xs">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-24 right-2 z-20 flex flex-col items-center space-y-6">
                <div className="flex flex-col items-center">
                  <button className="p-2 text-white hover:text-threadtok-accent transition-colors">
                    <Heart className={cn("h-7 w-7", index % 2 === 1 ? "text-red-500 fill-red-500" : "")} />
                  </button>
                  <span className="text-xs mt-1">{formatNumber(video.stats.likes)}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <button className="p-2 text-white hover:text-threadtok-accent transition-colors">
                    <MessageCircle className="h-7 w-7" />
                  </button>
                  <span className="text-xs mt-1">{formatNumber(video.stats.comments)}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <button className="p-2 text-white hover:text-threadtok-accent transition-colors">
                    <Share2 className="h-7 w-7" />
                  </button>
                  <span className="text-xs mt-1">{formatNumber(video.stats.reposts)}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <button className="p-2 text-white"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  >
                    <ChevronLeft className={cn(
                      "h-7 w-7 transition-transform", 
                      isDetailsOpen ? "rotate-180" : ""
                    )} />
                  </button>
                </div>
              </div>
              
              <div 
                className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-pointer"
                onClick={() => handleSwipe('left')}
              />
              <div 
                className="absolute inset-y-0 right-0 w-1/4 z-20 cursor-pointer"
                onClick={() => handleSwipe('right')}
              />
              
              <div className={cn(
                "absolute inset-y-0 right-0 w-3/4 bg-threadtok-background/95 backdrop-blur-lg z-30 transform transition-transform duration-300 ease-in-out border-l border-threadtok-border",
                isDetailsOpen ? "translate-x-0" : "translate-x-full"
              )}>
                <div className="h-full overflow-y-auto p-4">
                  <button 
                    className="mb-4 p-2 rounded-full bg-threadtok-muted hover:bg-threadtok-card transition-colors"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="flex items-center mb-6">
                    <UserAvatar 
                      src={video.user.avatar} 
                      alt={video.user.name} 
                      size="lg" 
                      className="mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">{video.user.name}</h3>
                        {video.user.verified && (
                          <svg className="h-4 w-4 text-threadtok-accent fill-current ml-1" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">@{video.user.username}</p>
                    </div>
                    <button className="ml-auto bg-threadtok-accent px-4 py-1.5 rounded-full text-sm font-medium">
                      Follow
                    </button>
                  </div>
                  
                  <p className="text-lg mb-4">{video.content}</p>
                  
                  <div className="flex items-center justify-between mb-6 text-gray-400 text-sm">
                    <span>{format(video.createdAt, 'MMM d, yyyy')}</span>
                    <div className="flex space-x-4">
                      <span>{formatNumber(video.stats.likes)} likes</span>
                      <span>{formatNumber(video.stats.comments)} comments</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-threadtok-border pt-4">
                    <h4 className="font-semibold mb-4">Comments</h4>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex mb-4">
                        <UserAvatar 
                          src={`https://source.unsplash.com/random/150x150/?portrait-${10 + i}`} 
                          alt={`Commenter ${i}`} 
                          size="sm" 
                          className="mr-2 flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">username_{i}</span>
                            <span className="ml-2 text-xs text-gray-500">{i + 1}h ago</span>
                          </div>
                          <p className="text-sm">This is an amazing video! Love the content.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Explore;
