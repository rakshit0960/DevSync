"use client";

import React, { useState } from "react";

export default function Docs() {
  const [content, setContent] = useState<string>("");

  return (
    <main className="min-h-screen flex flex-col p-8">
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Collaborative Document</h1>
          <p className="text-lg text-foreground/70">
            This is a placeholder for a real-time collaborative editor. For now,
            it&apos;s just a plain text area. You can integrate a rich text
            editor and real-time syncing logic later.
          </p>
        </div>

        <div className="rounded-lg border border-foreground/10 bg-background">
          <textarea
            className="w-full min-h-[400px] p-4 rounded-lg bg-transparent text-foreground resize-none focus:outline-none"
            placeholder="Type something here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}
