
import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Image as ImageIcon, 
  Video, 
  MapPin, 
  X, 
  Hash, 
  Filter, 
  Crop, 
  Type, 
  Upload, 
  Camera, 
  Globe, 
  Users, 
  Lock
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type MediaType = {
  type: 'image' | 'video';
  url: string;
};

type Visibility = 'public' | 'friends' | 'private';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [media, setMedia] = useState<MediaType | null>(null);
  const [visibility, setVisibility] = useState<Visibility>('public');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image or video
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast.error('Please select an image or video file');
      return;
    }
    
    const fileUrl = URL.createObjectURL(file);
    setMedia({
      type: isImage ? 'image' : 'video',
      url: fileUrl
    });
  };
  
  const handleRemoveMedia = () => {
    if (media?.url) {
      URL.revokeObjectURL(media.url);
    }
    setMedia(null);
  };
  
  const getVisibilityIcon = () => {
    switch(visibility) {
      case 'public': return <Globe className="h-4 w-4" />;
      case 'friends': return <Users className="h-4 w-4" />;
      case 'private': return <Lock className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };
  
  const getVisibilityText = () => {
    switch(visibility) {
      case 'public': return 'Public';
      case 'friends': return 'Friends only';
      case 'private': return 'Private';
      default: return 'Public';
    }
  };
  
  const handlePost = () => {
    // Validate form
    if (!caption.trim() && !media) {
      toast.error('Please add a caption or media to your post');
      return;
    }
    
    // Here you would typically send the post data to an API
    toast.success('Post created successfully!');
    
    // Reset form
    setCaption('');
    setLocation('');
    setHashtags('');
    handleRemoveMedia();
  };
  
  return (
    <div className="min-h-screen bg-threadtok-background pb-16">
      <Navbar hideStories={true} />
      
      <main className="max-w-screen-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Create Post</h1>
          <Button 
            onClick={handlePost}
            className="bg-threadtok-accent hover:bg-threadtok-accent/90"
          >
            Post
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Media Upload Section */}
          {!media ? (
            <div className="border-2 border-dashed border-threadtok-border rounded-lg p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    Upload
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-5 w-5" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  Supports JPG, PNG, GIF, MP4
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden bg-threadtok-muted">
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 z-10 rounded-full"
                onClick={handleRemoveMedia}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {media.type === 'image' ? (
                <img 
                  src={media.url} 
                  alt="Preview" 
                  className="w-full max-h-[500px] object-contain" 
                />
              ) : (
                <video 
                  src={media.url} 
                  controls 
                  className="w-full max-h-[500px]" 
                />
              )}
              
              {media.type === 'image' && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex justify-center gap-4">
                  <Button variant="ghost" size="sm" className="text-white">
                    <Crop className="h-4 w-4 mr-1" />
                    Crop
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white">
                    <Type className="h-4 w-4 mr-1" />
                    Text
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Caption and Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="caption" className="text-white mb-2 block">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="bg-threadtok-muted border-threadtok-border text-white min-h-[100px]"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <Label htmlFor="hashtags" className="text-white">Hashtags</Label>
                </div>
                <Input
                  id="hashtags"
                  placeholder="#trending #fashion"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="bg-threadtok-muted border-threadtok-border text-white"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <Label htmlFor="location" className="text-white">Location</Label>
                </div>
                <Input
                  id="location"
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-threadtok-muted border-threadtok-border text-white"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                {getVisibilityIcon()}
                <Label className="text-white">Visibility</Label>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-threadtok-muted border-threadtok-border text-white"
                  >
                    <div className="flex items-center gap-2">
                      {getVisibilityIcon()}
                      <span>{getVisibilityText()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-threadtok-card border-threadtok-border">
                  <DropdownMenuItem onClick={() => setVisibility('public')} className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Public</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setVisibility('friends')} className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Friends only</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setVisibility('private')} className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav activePage="create" />
    </div>
  );
};

export default CreatePost;
