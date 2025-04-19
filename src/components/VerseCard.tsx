// components/VerseCard.tsx
"use client"; // Add this line to mark it as a client component

import React from "react";
import Image from "next/image";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "../utils/youtube";
import { Verse } from "@/Types/types";

interface VerseCardProps {
  verse: Verse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  const videoId = extractYouTubeVideoId(verse.linkYoutube);
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : "";
  const [imgSrc, setImgSrc] = React.useState(thumbnailUrl);
console.log('imgSrc',imgSrc);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 mb-2 p-4">{verse.title}</h2>

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
            //   setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
              setImgSrc(`${imgSrc}`);
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
        {/* <h2 className="text-xl font-bold text-gray-800 mb-2">{verse.title}</h2> */}
        <div className="text-gray-600 whitespace-pre-line mb-4">{verse.description}</div>
        <a
          href={verse.linkYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
};

export default VerseCard;



// // components/VerseCard.tsx
// import React from "react";
// import Image from "next/image";
// import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "../utils/youtube";
// import { Verse } from "@/Types/types";

// interface VerseCardProps {
//   verse: Verse;
// }

// const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
//   const videoId = extractYouTubeVideoId(verse.linkYoutube);
//   const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : "";

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       {videoId && (
//         <div className="relative h-48 w-full">
//           <Image
//             src={thumbnailUrl}
//             alt={`Thumbnail for ${verse.title}`}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             className="object-cover"
//             onError={(e) => {
//               // Fallback to default thumbnail if maxresdefault is not available
//               const target = e.target as HTMLImageElement;
//               target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//             }}
//           />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="bg-red-600 rounded-full p-3 opacity-90">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="p-4">
//         <h2 className="text-xl font-bold text-gray-800 mb-2">{verse.title}</h2>
//         <div className="text-gray-600 whitespace-pre-line mb-4">{verse.description}</div>
//         <a
//           href={verse.linkYoutube}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
//         >
//           Watch Video
//         </a>
//       </div>
//     </div>
//   );
// };

// export default VerseCard;