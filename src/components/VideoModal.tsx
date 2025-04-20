"use client";

import React, { useEffect, useRef } from "react";
import { extractYouTubeVideoId } from "../utils/youtube";

interface VideoModalProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, isOpen, onClose, title, description }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoId = extractYouTubeVideoId(videoUrl);
  
  // Format the description to handle line breaks properly
  const formattedDescription = description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < description.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] my-8 flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          <div className="relative pb-[56.25%] h-0">
            {videoId && (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={`YouTube video: ${title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          
          <div className="p-4">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Summary Description:</h4>
            <div className="text-gray-700 leading-relaxed">{formattedDescription}</div>
          </div>
        </div>
        
        <div className="p-4 border-t sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;