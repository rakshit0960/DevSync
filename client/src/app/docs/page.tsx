'use client';

import React, { useState } from "react";

export default function Docs() {
  const [content, setContent] = useState<string>("");

  return (
    <main className="min-h-screen flex flex-col p-8 pt-24 bg-gradient-to-b from-gray-900 via-purple-900 to-pink-900">
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Collaborative Document
          </h1>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
            Create and edit documents in real-time with your team. Changes are saved automatically.
          </p>
        </div>

        <div className="rounded-xl border border-purple-500/20 bg-gray-900/50 shadow-2xl backdrop-blur-sm">
          <div className="border-b border-purple-500/20 p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <textarea
            className="w-full min-h-[500px] p-6 rounded-b-xl bg-transparent text-gray-200 resize-none focus:outline-none font-mono text-sm leading-relaxed placeholder-gray-400/50"
            placeholder="Start typing your document here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}