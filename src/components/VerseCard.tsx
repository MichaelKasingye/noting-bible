"use client";

import React, { useState } from "react";
import Image from "next/image";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "../utils/youtube";
import VideoModal from "./VideoModal";
import { Verse } from "@/Types/types";

interface VerseCardProps {
  verse: Verse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  const videoId = extractYouTubeVideoId(verse.linkYoutube);
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : "";
  const [imgSrc, setImgSrc] = useState(thumbnailUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
        onClick={handleCardClick}
      >
        {videoId && (
          <div className="relative h-48 w-full">
            <Image
              src={imgSrc}
              alt={`Thumbnail for ${verse.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => {
                // Fallback to default thumbnail if maxresdefault is not available
                setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3 opacity-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{verse.title}</h2>
          <div className="text-gray-600 mb-4 line-clamp-2 h-12 overflow-hidden">
            {verse.description}
          </div>
          <button
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              setIsModalOpen(true);
            }}
          >
            Watch Video
          </button>
        </div>
      </div>

      <VideoModal
        videoUrl={verse.linkYoutube}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={verse.title}
        description={verse.description}
      />
    </>
  );
};

export default VerseCard;