import React, { useState } from 'react';
import { Bell, Plus, Search, X } from "lucide-react";
import StoryCircle from '../story/StoryCircle';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  className?: string;
  hideStories?: boolean;
}

interface Story {
  id: number;
  username: string;
  avatarSrc?: string;
  viewed: boolean;
  content?: {
    type: 'image' | 'video' | 'text';
    url?: string;
    text?: string;
  }[];
}

const currentUser = {
  username: "you",
  avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=0",
};

const mockStories: Story[] = [
  {
    id: 1,
    username: "alex_design",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=1",
    viewed: false,
    content: [
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?design=1"
      },
      {
        type: 'text',
        text: "Working on new designs! 🎨"
      }
    ]
  }, 
  {
    id: 2,
    username: "maria",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=2",
    viewed: false,
    content: [
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?travel=1"
      }
    ]
  }, 
  {
    id: 3,
    username: "chris.codes",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=3",
    viewed: false,
    content: [
      {
        type: 'text',
        text: "Just launched a new project!"
      },
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?laptop=1"
      }
    ]
  }, 
  {
    id: 4,
    username: "taylor42",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=4",
    viewed: true,
    content: [
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?music=1"
      }
    ]
  }, 
  {
    id: 5,
    username: "dev.ninja",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=5",
    viewed: false,
    content: [
      {
        type: 'video',
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      }
    ]
  }, 
  {
    id: 6,
    username: "sarah_j",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=6",
    viewed: true,
    content: [
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?nature=1"
      }
    ]
  }, 
  {
    id: 7,
    username: "mike_visuals",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=7",
    viewed: false,
    content: [
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?art=1"
      }
    ]
  }, 
  {
    id: 8,
    username: "tech_lisa",
    avatarSrc: "https://source.unsplash.com/random/150x150/?portrait=8",
    viewed: true,
    content: [
      {
        type: 'image',
        url: "https://source.unsplash.com/random/800x1000/?tech=1"
      }
    ]
  }
];

const myStory: Story = {
  id: 0,
  username: currentUser.username,
  avatarSrc: currentUser.avatarSrc,
  viewed: false,
  content: [
    {
      type: 'text',
      text: "Add to your story by clicking the + button"
    }
  ]
};

const Navbar: React.FC<NavbarProps> = ({
  className,
  hideStories = false
}) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentStoryIndex(0);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
  };

  const goToNextStoryItem = () => {
    if (!selectedStory || !selectedStory.content) return;
    
    if (currentStoryIndex < selectedStory.content.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      const currentStoryIdx = mockStories.findIndex(s => s.id === selectedStory.id);
      if (currentStoryIdx >= 0 && currentStoryIdx < mockStories.length - 1) {
        openStory(mockStories[currentStoryIdx + 1]);
      } else {
        closeStory();
      }
    }
  };

  const goToPrevStoryItem = () => {
    if (!selectedStory || !selectedStory.content) return;
    
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else {
      const currentStoryIdx = mockStories.findIndex(s => s.id === selectedStory.id);
      if (currentStoryIdx > 0) {
        const prevStory = mockStories[currentStoryIdx - 1];
        openStory(prevStory);
        if (prevStory.content && prevStory.content.length > 0) {
          setCurrentStoryIndex(prevStory.content.length - 1);
        }
      }
    }
  };

  return <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-threadtok-background/80 border-b border-threadtok-border">
      <div className="w-full max-w-screen-md mx-auto px-4">
        <div className="py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">threadtok</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-threadtok-muted transition-app">
              <Search className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-threadtok-muted transition-app">
              <Bell className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        
        {!hideStories && (
          <div className="stories-container py-[12px]">
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 py-[2px]">
              <StoryCircle 
                key="your-story" 
                username={currentUser.username} 
                avatarSrc={currentUser.avatarSrc} 
                viewed={false} 
                isCurrentUser={true}
                onClick={() => openStory(myStory)}
              />
              
              {mockStories.map(story => (
                <StoryCircle 
                  key={story.id} 
                  username={story.username} 
                  avatarSrc={story.avatarSrc}
                  viewed={story.viewed} 
                  onClick={() => openStory(story)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && closeStory()}>
        <DialogContent className="max-w-[420px] p-0 h-[80vh] flex flex-col bg-black border-threadtok-border">
          {selectedStory && selectedStory.content && (
            <div className="relative flex-1 flex flex-col">
              <div className="p-4 flex items-center gap-3 border-b border-threadtok-border">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedStory.avatarSrc} alt={selectedStory.username} />
                </Avatar>
                <span className="text-white font-medium">{selectedStory.username}</span>
                <button 
                  className="ml-auto p-1 rounded-full hover:bg-threadtok-muted" 
                  onClick={closeStory}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full w-1/3 z-10 cursor-pointer"
                  onClick={goToPrevStoryItem}
                ></div>
                
                <div 
                  className="absolute right-0 top-0 h-full w-1/3 z-10 cursor-pointer"
                  onClick={goToNextStoryItem}
                ></div>
                
                <div className="w-full h-full flex items-center justify-center">
                  {selectedStory.content[currentStoryIndex].type === 'image' && (
                    <img 
                      src={selectedStory.content[currentStoryIndex].url} 
                      className="max-h-full object-contain"
                      alt="Story"
                    />
                  )}
                  {selectedStory.content[currentStoryIndex].type === 'video' && (
                    <video 
                      src={selectedStory.content[currentStoryIndex].url} 
                      className="max-h-full object-contain"
                      controls
                      autoPlay
                    />
                  )}
                  {selectedStory.content[currentStoryIndex].type === 'text' && (
                    <div className="p-8 text-center">
                      <p className="text-white text-xl font-medium">
                        {selectedStory.content[currentStoryIndex].text}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
                  {selectedStory.content.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 flex-1 rounded-full ${idx === currentStoryIndex ? 'bg-white' : 'bg-gray-600'}`}
                    ></div>
                  ))}
                </div>
              </div>
              
              {selectedStory.id === 0 && (
                <div className="p-4 flex justify-center">
                  <Button className="flex items-center gap-2 bg-threadtok-accent hover:bg-threadtok-accent/80">
                    <Plus className="h-4 w-4" />
                    <span>Add to Your Story</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </header>;
};

export default Navbar;
