"use client";

import { useState } from "react";
import { verses } from "../data/OT-verses";
import VerseCard from "../components/VerseCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredVerses = verses.filter(verse => {
    const searchLower = searchQuery.toLowerCase();
    return (
      verse.title.toLowerCase().includes(searchLower) ||
      verse.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Noting Bible Chapter Videos</h1>
          <p className="mt-2">Explore the Bible through video explanations</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {filteredVerses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-700">No chapters found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredVerses.map((verse, index) => (
              <VerseCard key={index} verse={verse} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          {/* <p>© {new Date().getFullYear()} Bible Noting Chapter Videos</p> */}
          <p>{new Date().getFullYear()} Bible Noting Chapter Videos</p>
        </div>
      </footer>
    </div>
  );
}