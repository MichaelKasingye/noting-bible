// utils/youtube.ts

export interface YouTubeMetadata {
    title: string;
    description: string;
    thumbnailUrl: string;
  }
  
  // Extract YouTube video ID from various YouTube URL formats
  export const extractYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Get thumbnail URL from YouTube video ID
  export const getYouTubeThumbnailUrl = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };