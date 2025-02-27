
import React from 'react';
import { Bell, Search } from "lucide-react";
import StoryCircle from '../story/StoryCircle';

interface NavbarProps {
  className?: string;
}

const mockStories = [
  { id: 1, username: "alex_design", viewed: false },
  { id: 2, username: "maria", viewed: false },
  { id: 3, username: "chris.codes", viewed: false },
  { id: 4, username: "taylor42", viewed: true },
  { id: 5, username: "dev.ninja", viewed: false },
  { id: 6, username: "sarah_j", viewed: true },
  { id: 7, username: "mike_visuals", viewed: false },
  { id: 8, username: "tech_lisa", viewed: true },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-threadtok-background/80 border-b border-threadtok-border">
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
        
        <div className="stories-container py-3">
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
            {mockStories.map((story) => (
              <StoryCircle
                key={story.id}
                username={story.username}
                viewed={story.viewed}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
