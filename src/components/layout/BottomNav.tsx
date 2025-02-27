
import React, { useState } from 'react';
import { Home, Search, PlusSquare, MessageCircle, User } from "lucide-react";
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "create", icon: PlusSquare, label: "Create" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-threadtok-background/90 backdrop-blur-lg border-t border-threadtok-border z-40">
      <div className="mx-auto max-w-screen-md px-4">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-app",
                activeTab === item.id
                  ? "text-threadtok-accent"
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 mb-1",
                  item.id === "create" && "text-threadtok-accent"
                )}
              />
              <span className="text-xs">{item.label}</span>
              {activeTab === item.id && (
                <div className="absolute bottom-0 w-10 h-1 bg-threadtok-accent rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
