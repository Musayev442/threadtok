
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = "User",
  size = "md",
  online = false,
  className
}) => {
  const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(
        "border-2 border-threadtok-background transition-transform duration-200 hover:scale-105",
        sizeClasses[size],
      )}>
        <AvatarImage 
          src={src || "https://source.unsplash.com/random/150x150/?person"} 
          alt={alt} 
          className="object-cover"
        />
        <AvatarFallback className="bg-threadtok-card text-white">
          {alt.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {online && (
        <span className="absolute bottom-0 right-0 block rounded-full bg-green-500 ring-2 ring-threadtok-background">
          <span className={cn(
            "block rounded-full bg-green-500",
            {
              "h-1.5 w-1.5": size === "xs" || size === "sm",
              "h-2 w-2": size === "md",
              "h-2.5 w-2.5": size === "lg" || size === "xl",
            }
          )}></span>
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
