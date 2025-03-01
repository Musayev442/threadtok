
import React from 'react';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface BottomNavProps {
  className?: string;
  activePage?: 'home' | 'explore' | 'create' | 'messages' | 'profile';
}

const BottomNav: React.FC<BottomNavProps> = ({
  className,
  activePage = 'home'
}) => {
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
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-threadtok-background/80 backdrop-blur-lg border-t border-threadtok-border z-40",
      className
    )}>
      <div className="max-w-screen-md mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex flex-col items-center px-3 py-1.5 rounded-lg transition-all",
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
    </nav>
  );
};

export default BottomNav;
